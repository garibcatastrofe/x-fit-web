import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { updateMembresia } from "../../../api/Membresias/updateMembresia";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useModal } from "../../../stores/Modal/modalStore";
import { Membresia } from "../../../types/Membresias/Membresia";
import { useAnnouncement } from "../../../stores/Announcement/announcementStore";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { motion } from "framer-motion";
import { IoIosAdd } from "react-icons/io";

export function ModalBodyUpdate({ dato }: { dato: Membresia }) {
  const { setModal, modalTitle, modalBody } = useModal();
  const { setAnnouncement } = useAnnouncement();
  const [duracion_meses, setDuracion] = useState<number>(0.25);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      membresia_id: dato.id,
      nombre: "",
      precio: 1,
      descripcion: "",
      tipo: "",
    },
    shouldUnregister: false,
  });

  const { setMensaje } = useMessageUpdated();

  useEffect(() => {
    if (dato) {
      reset({
        membresia_id: dato.id ?? 0,
        nombre: dato.nombre ?? "",
        precio: dato.precio ?? 0,
        descripcion: dato.descripcion ?? "",
        tipo: dato.tipo ?? "",
      });
      setDuracion(dato.duracion_meses)
    }
  }, [dato, reset]);

  const onSubmit = async (data: {
    membresia_id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    tipo: string;
  }) => {
    try {
      /* FORMATEAR TODOS LOS DATOS PARA HACER VERIFICACIONES ANTES DE MANDAR */
      const formattedData = {
        ...data,
        duracion_meses,
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

      /* PRECIO */
      if (formattedData.precio < 1 || formattedData.precio > 1000000) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              El precio debe estar entre 1 y 1000000
            </p>
          </div>
        );
        setError("precio", {
          type: "server",
          message: "El precio debe estar entre 1 y 1000000",
        });
        return;
      }

      /* DURACIÓN MESES */
      if (
        formattedData.duracion_meses < 0.25 ||
        formattedData.duracion_meses > 60
      ) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              La duración en meses debe ser entre 0.25 y 60
            </p>
          </div>
        );
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

      /* TIPO */
      if (formattedData.tipo === "Ninguno") {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">Seleccione un tipo</p>
          </div>
        );
        setError("tipo", { type: "server", message: "Seleccione un tipo" });
        return;
      }

      const response = await updateMembresia({
        ...data, // ✅ Mantiene los datos del formulario
        setMensaje, // ✅ Se pasa como argumento separado
        duracion_meses,
      });

      if (
        response?.message &&
        response.message.includes("actualizada exitosamente")
      ) {
        setAnnouncement(
          true,
          "bg-green-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleCheck className="text-xl text-white" />
            <p className="font-medium text-white">
              Membresía actualizada correctamente
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
              Error al actualizar membresía
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
          <p className="font-medium text-white">Error al actualiza membresía</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[50vh]">
      {/* ID DE LA MEMBRESIA */}
      <Controller
        name="membresia_id"
        control={control}
        render={({ field }) => (
          <input {...field} type="hidden" value={field.value} />
        )}
      />

      <div className="flex-1 pr-2 overflow-y-scroll scrollbar-custom">
        {/* NOMBRE DE LA MEMBRESIA */}
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
                placeholder="Nombre de la membresía"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.nombre && (
            <p className="ml-1 text-red-500">{errors.nombre?.message}</p>
          )}
        </div>

        {/* PRECIO DE LA MEMBRESIA */}
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Precio</p>
          <Controller
            name="precio"
            control={control}
            rules={{ required: "El precio es requerido" }}
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
                id="precio"
                placeholder="Precio de la membresía"
                minLength={1}
                maxLength={12}
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.precio && (
            <p className="ml-1 text-red-500">{errors.precio.message}</p>
          )}
        </div>

        {/* DURACION_MESES */}
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Duración (meses)</p>
          <p>
            Nota: La duración en meses puede ser decimal, lo único que esto
            significa es la capacidad de guardar semanas, por ejemplo: 0.25 es
            una semana y 3.75 son tres meses y tres semanas
          </p>
          <div className="flex items-center justify-center w-full gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center w-full p-4 mt-2 text-white bg-red-600 rounded-xl disabled:opacity-50"
              onClick={() => setDuracion(duracion_meses - 0.25)}
              disabled={duracion_meses <= 0.25 ? true : false}
            >
              <FiMinus className="text-lg" />
            </motion.button>
            <p className="w-full text-center">{duracion_meses}</p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center w-full p-4 mt-2 text-white bg-red-600 rounded-xl disabled:opacity-50"
              onClick={() => setDuracion(duracion_meses + 0.25)}
              disabled={duracion_meses >= 60 ? true : false}
            >
              <IoIosAdd className="text-lg" />
            </motion.button>
          </div>
        </div>

        {/* DESCRIPCIÓN DE LA MEMBRESIA */}
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
                placeholder="Descripción de la membresía"
                className="w-full h-40 p-4 bg-transparent border-2 border-gray-100 outline-none resize-none rounded-xl"
              />
            )}
          />
          {errors.descripcion && (
            <p className="ml-1 text-red-500">{errors.descripcion?.message}</p>
          )}
        </div>

        {/* GÉNERO DEL CLIENTE */}
        <div className="flex flex-col items-start gap-4 my-4">
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
                <option value="Ninguno">Seleccione un tipo</option>
                <option value="INDIVIDUAL">INDIVIDUAL</option>
                <option value="GRUPAL">GRUPAL</option>
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
