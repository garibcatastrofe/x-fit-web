import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { updatePromocion } from "../../../api/Promociones/updatePromocion";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useModal } from "../../../stores/Modal/modalStore";
import { Promocion } from "../../../types/Promociones/Promocion";
import { useAnnouncement } from "../../../stores/Announcement/announcementStore";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

export function ModalBodyUpdate({ dato }: { dato: Promocion }) {
  const { setModal, modalTitle, modalBody } = useModal();
  const { setAnnouncement } = useAnnouncement();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      promocion_id: dato.id,
      nombre: "",
      descuento: 1,
      tipo_descuento: "",
      fecha_inicio: "",
      fecha_vencimiento: "",
      estatus: "",
      descripcion: "",
    },
    shouldUnregister: false,
  });

  const { setMensaje } = useMessageUpdated();

  useEffect(() => {
    if (dato) {
      reset({
        promocion_id: dato.id ?? 0,
        nombre: dato.nombre ?? "",
        descuento: dato.descuento ?? 0,
        tipo_descuento: dato.tipo_descuento ?? "",
        fecha_inicio: dato.fecha_inicio ?? "",
        fecha_vencimiento: dato.fecha_vencimiento ?? "",
        estatus: dato.estatus ?? "",
        descripcion: dato.descripcion ?? "",
      });
    }
  }, [dato, reset]);

  const onSubmit = async (data: {
    promocion_id: number;
    nombre: string;
    descuento: number;
    tipo_descuento: string;
    fecha_inicio: string;
    fecha_vencimiento: string;
    estatus: string;
    descripcion: string;
  }) => {
    try {
      /* FORMATEAR TODOS LOS DATOS PARA HACER VERIFICACIONES ANTES DE MANDAR */
      const formattedData = {
        ...data,
        setMensaje: setMensaje,
      };

      /* NOMBRE */
      if (formattedData.nombre.length < 3 || formattedData.nombre.length > 50) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              El nombre debe de ser de 3 a 50 letras
            </p>
          </div>
        );
        setError("nombre", {
          type: "server",
          message: "El nombre debe de ser de 3 a 50 letras",
        });
        return;
      }

      /* DESCUENTO */
      if (formattedData.descuento < 1 || formattedData.descuento > 1000000) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              El descuento debe estar entre 1 y 1000000
            </p>
          </div>
        );
        setError("descuento", {
          type: "server",
          message: "El descuento debe estar entre 1 y 1000000",
        });
        return;
      }

      /* TIPO DESCUENTO */
      if (formattedData.tipo_descuento === "Ninguno") {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">Seleccione un tipo</p>
          </div>
        );
        setError("tipo_descuento", {
          type: "server",
          message: "Seleccione un tipo",
        });
        return;
      }

      /* ESTATUS */
      if (formattedData.estatus === "Ninguno") {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">Seleccione un estatus</p>
          </div>
        );
        setError("estatus", {
          type: "server",
          message: "Seleccione un estatus",
        });
        return;
      }

      /* DESCRIPCIÓN */
      if (
        formattedData.descripcion.length < 25 ||
        formattedData.descripcion.length > 200
      ) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              La descripción debe de ser de 25 a 200 letras
            </p>
          </div>
        );
        setError("descripcion", {
          type: "server",
          message: "La descripción debe de ser de 25 a 200 letras",
        });
        return;
      }

      const response = await updatePromocion({
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
              Promoción actualizada correctamente
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
              Error al actualizar promoción
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
          <p className="font-medium text-white">
            Error al actualizar promoción
          </p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[50vh]">
      {/* ID DE LA PROMOCIÓN */}
      <Controller
        name="promocion_id"
        control={control}
        render={({ field }) => (
          <input {...field} type="hidden" value={field.value} />
        )}
      />

      <div className="flex-1 pr-2 overflow-y-scroll scrollbar-custom">
        {/* NOMBRE DE LA PROMOCIÓN */}
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Nombre</p>
          <Controller
            name="nombre"
            control={control}
            rules={{ required: "El nombre es requerido" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="text"
                id="nombre"
                minLength={3}
                maxLength={50}
                placeholder="Nombre de la promoción"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.nombre && (
            <p className="ml-1 text-red-500">{errors.nombre?.message}</p>
          )}
        </div>

        {/* DESCUENTO DE LA PROMOCIÓN */}
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Descuento</p>
          <Controller
            name="descuento"
            control={control}
            rules={{ required: "El descuento es requerido" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                  onChange(val); // Actualiza el estado con solo números
                }}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "-" || e.key === "+") {
                    e.preventDefault(); // Bloquea la entrada de estos caracteres
                  }
                }}
                value={value}
                type="text" // Cambia a "text" para evitar comportamientos extraños con números
                inputMode="numeric" // Ayuda en móviles
                pattern="[0-9]*" // Solo números
                id="descuento"
                placeholder="Descuento de la promoción"
                minLength={1}
                maxLength={12}
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.descuento && (
            <p className="ml-1 text-red-500">{errors.descuento.message}</p>
          )}
        </div>

        {/* TIPO DESCUENTO DE LA PROMOCIÓN */}
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Tipo descuento</p>
          <Controller
            name="tipo_descuento"
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
                <option value="Ninguno">Seleccione un tipo</option>
                <option value="MONTO FIJO">MONTO FIJO</option>
                <option value="PORCENTAJE">PORCENTAJE</option>
              </select>
            )}
          />
          {errors.tipo_descuento && (
            <p className="ml-1 text-red-500">{errors.tipo_descuento.message}</p>
          )}
        </div>

        {/* FECHA DE INICIO */}
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Fecha de inicio</p>
          <Controller
            name="fecha_inicio"
            control={control}
            rules={{ required: "La fecha de inicio es requerida" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="date"
                id="fecha_inicio"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.fecha_inicio && (
            <p className="ml-1 text-red-500">{errors.fecha_inicio.message}</p>
          )}
        </div>

        {/* FECHA DE VENCIMIENTO */}
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Fecha de vencimiento</p>
          <Controller
            name="fecha_vencimiento"
            control={control}
            rules={{ required: "La fecha de vencimiento es requerida" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="date"
                id="fecha_vencimiento"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.fecha_vencimiento && (
            <p className="ml-1 text-red-500">
              {errors.fecha_vencimiento.message}
            </p>
          )}
        </div>

        {/* ESTATUS DE LA PROMOCIÓN */}
        <div className="flex flex-col items-start gap-4 my-4">
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
          {errors.tipo_descuento && (
            <p className="ml-1 text-red-500">{errors.tipo_descuento.message}</p>
          )}
        </div>

        {/* DESCRIPCIÓN DE LA PROMOCIÓN */}
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Descripción</p>
          <Controller
            name="descripcion"
            control={control}
            rules={{ required: "La descripción es necesaria" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <textarea
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id="descripcion"
                minLength={25}
                maxLength={200}
                placeholder="Descripción de la promoción"
                className="w-full h-40 p-4 bg-transparent border-2 border-gray-100 outline-none resize-none rounded-xl"
              />
            )}
          />
          {errors.descripcion && (
            <p className="ml-1 text-red-500">{errors.descripcion?.message}</p>
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
