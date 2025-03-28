//import InputText from "../../../ui/InputText";
import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { updateCliente } from "../../../api/Clientes/updateCliente";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useModal } from "../../../stores/Modal/modalStore";
import { ClientePrimitive } from "../../../types/Clientes/ClientePrimitive";
import logo from "../../../assets/logo_sinFondoLetrasNegras.png";
import { QRCodeCanvas } from "qrcode.react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Font,
  View,
} from "@react-pdf/renderer";
import { FaFilePdf } from "react-icons/fa6";
import { useAnnouncement } from "../../../stores/Announcement/announcementStore";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

// 📌 1. Registrar la fuente (desde Google Fonts)
Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "/fonts/Poppins-Regular.ttf", // Ruta de la fuente regular
    },
    {
      src: "/fonts/Poppins-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 40,
    color: "#dc2626",
    fontFamily: "Poppins",
  },
  qrCode: { width: 500, height: 500, marginVertical: 10 },
  image: { width: 300, marginBottom: 20 },
});

function PDFDocument({
  usuario,
  qrImage,
}: {
  usuario: string;
  qrImage: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 30,
            backgroundColor: "#dc2626",
          }}
        ></View>
        <Image src={logo} style={styles.image} />
        <Text style={styles.title}>Código QR para {usuario}</Text>
        <Image src={qrImage} style={styles.qrCode} />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 30,
            backgroundColor: "#dc2626",
          }}
        ></View>
      </Page>
    </Document>
  );
}

function CodigoQR({
  data,
  onGenerate,
}: {
  data: string;
  onGenerate: (img: string) => void;
}) {
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (qrRef.current) {
      const qrImage = qrRef.current.toDataURL("image/png");
      onGenerate(qrImage);
    }
  }, [data, onGenerate]);

  return <QRCodeCanvas ref={qrRef} value={data} size={150} />;
}

export function QRWithPDF({
  dato,
}: {
  dato: { usuario: { id: number; nombres: string } };
}) {
  const [qrImage, setQrImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <CodigoQR data={dato.usuario.id.toString()} onGenerate={setQrImage} />
      {qrImage && (
        <div>
          <PDFDownloadLink
            className="flex items-center justify-center gap-2 px-4 py-2 font-medium text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-500"
            document={
              <PDFDocument usuario={dato.usuario.nombres} qrImage={qrImage} />
            }
            fileName={`codigo_qr_${dato.usuario.nombres}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                "Generando PDF..."
              ) : (
                <>
                  <FaFilePdf className="text-xl" />
                  <span>Descargar</span>
                </>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export function ModalBodyUpdate({ dato }: { dato: ClientePrimitive }) {
  const { setModal, modalTitle, modalBody } = useModal();
  const { setAnnouncement } = useAnnouncement();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cliente_id: dato.cliente.id,
      nombres: "",
      apellidos: "",
      genero: "",
      fecha_nacimiento: "",
      correo: "",
      password: "",
      telefono: "",
      estatus: "ACTIVO",
      tipo: "",
      usuario_id: dato.usuario.id,
    },
    shouldUnregister: false,
  });

  const { setMensaje } = useMessageUpdated();

  useEffect(() => {
    if (dato) {
      reset({
        cliente_id: dato.cliente.id ?? 0,
        nombres: dato.usuario.nombres ?? "",
        apellidos: dato.usuario.apellidos ?? "",
        genero: dato.usuario.genero ?? "",
        fecha_nacimiento: dato.usuario.fecha_nacimiento ?? "",
        correo: dato.usuario.correo ?? "",
        telefono: dato.usuario.telefono ?? "",
        estatus: dato.usuario.estatus ?? "",
        tipo: dato.cliente.tipo ?? "",
        usuario_id: dato.usuario.id ?? 0,
      });
    }
  }, [dato, reset]);

  const onSubmit = async (data: {
    cliente_id: number;
    nombres: string;
    apellidos: string;
    genero: string;
    fecha_nacimiento: string;
    correo: string;
    password: string;
    telefono: string;
    estatus: string;
    tipo: string;
    usuario_id: number;
  }) => {
    try {
      const response = await updateCliente({
        ...data, // ✅ Mantiene los datos del formulario
        setMensaje, // ✅ Se pasa como argumento separado
      });
      if (
        response?.message &&
        response.message.includes("actualizado exitosamente")
      ) {
        setAnnouncement(
          true,
          "bg-green-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleCheck className="text-xl text-white" />
            <p className="font-medium text-white">
              Cliente actualizado correctamente
            </p>
          </div>
        );
        setModal(false, modalTitle ?? "", modalBody);
      } else {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              Error al actualizar cliente
            </p>
          </div>
        );
      }
    } catch (error) {
      console.log(error);
      setAnnouncement(
        true,
        "bg-red-500",
        <div className="flex items-center justify-center gap-4">
          <FaCircleXmark className="text-xl text-white" />
          <p className="font-medium text-white">Error al actualizar cliente</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[50vh]">
      {/* ID DEL CLIENTE */}
      <Controller
        name="cliente_id"
        control={control}
        render={({ field }) => (
          <input {...field} type="hidden" value={field.value} />
        )}
      />

      {/* NOMBRE */}
      <div className="flex-1 pr-2 overflow-y-scroll scrollbar-custom">
        <div className="flex justify-center w-full h-fit">
          <div>
            <QRWithPDF
              dato={{
                usuario: {
                  id: dato.usuario.id,
                  nombres: dato.usuario.nombres + " " + dato.usuario.apellidos,
                },
              }}
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 mb-4">
          <p>Nombres</p>
          <Controller
            name="nombres"
            control={control}
            rules={{ required: "Los nombres son requeridos" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="text"
                id="nombres"
                placeholder="Nombres del cliente"
                className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.nombres && (
            <p className="ml-1 text-red-500">{errors.nombres.message}</p>
          )}
        </div>

        {/* APELLIDOS */}
        <div className="flex flex-col items-start gap-4 mb-4">
          <p>Apellidos</p>
          <Controller
            name="apellidos"
            control={control}
            rules={{ required: "Los apellidos son requeridos" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="text"
                id="apellidos"
                placeholder="Ingrese los apellidos"
                className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.apellidos && (
            <p className="ml-1 text-red-500">{errors.apellidos.message}</p>
          )}
        </div>

        {/* GÉNERO */}
        <div className="flex flex-col items-start gap-4 mb-4">
          <p>Género</p>
          <Controller
            name="genero"
            control={control}
            rules={{ required: "Seleccionar una opción es requerido" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={onChange}
                value={value} // React manejará la opción seleccionada con esto
                className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              >
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </select>
            )}
          />
          {errors.genero && (
            <p className="ml-1 text-red-500">{errors.genero.message}</p>
          )}
        </div>

        {/* FECHA DE NACIMIENTO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Fecha de nacimiento</p>
          <Controller
            name="fecha_nacimiento"
            control={control}
            rules={{ required: "La fecha de nacimiento es requerida" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="date"
                id="fecha_nacimiento"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.fecha_nacimiento && (
            <p className="ml-1 text-red-500">
              {errors.fecha_nacimiento.message}
            </p>
          )}
        </div>

        {/* CORREO DEL CLIENTE */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Correo</p>
          <Controller
            name="correo"
            control={control}
            rules={{ required: "El correo es requerido" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="text"
                id="correo"
                placeholder="Correo del cliente"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.correo && (
            <p className="ml-1 text-red-500">{errors.correo.message}</p>
          )}
        </div>

        {/* PASSWORD DEL CLIENTE */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Contraseña</p>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="password"
                id="password"
                placeholder="**********"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.password && (
            <p className="ml-1 text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* TELÉFONO DEL CLIENTE */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Teléfono</p>
          <Controller
            name="telefono"
            control={control}
            rules={{ required: "El teléfono es requerido" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="number"
                id="telefono"
                min={1}
                max={100000000000}
                placeholder="Teléfono del cliente"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.telefono && (
            <p className="ml-1 text-red-500">{errors.telefono.message}</p>
          )}
        </div>

        {/* ESTATUS DEL CLIENTE */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Estatus</p>
          <Controller
            name="estatus"
            control={control}
            rules={{
              required: "Seleccionar una opción es requerido",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id="estatus"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              >
                <option value="Ninguno">Seleccione un estatus</option>
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
              </select>
            )}
          />
          {errors.estatus && (
            <p className="ml-1 text-red-500">{errors.estatus.message}</p>
          )}
        </div>

        {/* TIPO DEL CLIENTE */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Tipo</p>
          <Controller
            name="tipo"
            control={control}
            rules={{
              required: "Seleccionar una opción es requerido",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id="tipo"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              >
                <option value="Ninguno">Seleccione el tipo</option>
                <option value="PERSONALIZADO">PERSONALIZADO</option>
                <option value="NORMAL">NORMAL</option>
              </select>
            )}
          />
          {errors.tipo && (
            <p className="ml-1 text-red-500">{errors.tipo.message}</p>
          )}
        </div>
      </div>
      <div className="flex justify-center w-full gap-4 pt-4 h-fit">
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 rounded-lg bg-neutral-500 hover:bg-neutral-400"
          onClick={() => setModal(false, modalTitle ?? "", modalBody)}
        >
          Cancelar
        </button>
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-500"
          onClick={handleSubmit(onSubmit)}
        >
          Actualizar
        </button>
      </div>
    </div>
  );
}
