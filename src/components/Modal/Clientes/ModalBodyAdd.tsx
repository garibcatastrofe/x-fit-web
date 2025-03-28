import { useForm, Controller } from "react-hook-form";
import { addCliente } from "../../../api/Clientes/addCliente";
import { useModal } from "../../../stores/Modal/modalStore";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useAnnouncement } from "../../../stores/Announcement/announcementStore";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

export function ModalBodyAdd() {
  const { setModal, modalTitle, modalBody } = useModal();
  const { setMensaje } = useMessageUpdated();
  const { setAnnouncement } = useAnnouncement();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombres: "",
      apellidos: "",
      genero: "",
      fecha_nacimiento: "",
      correo: "",
      password: "",
      telefono: "",
      estatus: "ACTIVO",
      tipo: "",
    },
  });

  const onSubmit = async (data: {
    nombres: string;
    apellidos: string;
    genero: string;
    fecha_nacimiento: string;
    correo: string;
    password: string;
    telefono: string;
    estatus: string;
    tipo: string;
  }) => {
    try {
      /* FORMATEAR TODOS LOS DATOS PARA HACER VERIFICACIONES ANTES DE MANDAR */
      const formattedData = {
        ...data,
        setMensaje: setMensaje,
      };

      /* NOMBRES */
      if(formattedData.nombres.length < 3 || formattedData.nombres.length > 50) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">El nombre debe de ser de 3 a 50 letras</p>
          </div>
        );
        setError("nombres", { type: "server", message: "El nombre debe de ser de 3 a 50 letras" });
        return;
      }

      /* APELLIDOS */
      if(formattedData.apellidos.length < 3 || formattedData.apellidos.length > 50) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">El apellido debe de ser de 3 a 50 letras</p>
          </div>
        );
        setError("apellidos", { type: "server", message: "El apellido debe de ser de 3 a 50 letras" });
        return;
      }

      /* GÉNERO */
      if (formattedData.genero === "Ninguno") {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">Seleccione un género</p>
          </div>
        );
        setError("genero", { type: "server", message: "Seleccione un género" });
        return;
      }

      /* CORREO */
      if(formattedData.correo.length < 5 || formattedData.correo.length > 100) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">El correo debe de ser de 5 a 100 letras</p>
          </div>
        );
        setError("correo", { type: "server", message: "El correo debe de ser de 5 a 100 letras" });
        return;
      }

      /* PASSWORD */
      if(formattedData.password.length < 5 || formattedData.password.length > 100) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">La contraseña debe de ser de 5 a 255 letras</p>
          </div>
        );
        setError("password", { type: "server", message: "La contraseña debe de ser de 5 a 255 letras" });
        return;
      }

      /* TELÉFONO */
      if(data.telefono.length < 10 || data.telefono.length > 12) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">Agregue un teléfono de 10 letras</p>
          </div>
        );
        setError("telefono", { type: "server", message: "Agregue un teléfono de 10 letras" });
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

      /* TIPO */
      if (formattedData.tipo === "Ninguno") {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              Seleccione un tipo para el cliente
            </p>
          </div>
        );
        setError("tipo", { type: "server", message: "Seleccione un tipo" });
        return;
      }

      const response = await addCliente(formattedData);

      if (response === "Ya existe un usuario con ese correo") {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              Ya existe un usuario con ese correo, intente con otro porfavor
            </p>
          </div>
        );
        setError("correo", { type: "server", message: response });
        return;
      }

      if (response.message === "Cliente creado exitosamente") {
        //console.log("response", response);
        setAnnouncement(
          true,
          "bg-green-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleCheck className="text-xl text-white" />
            <p className="font-medium text-white">
              Cliente agregado correctamente
            </p>
          </div>
        );
        reset();
        setModal(false, modalTitle ?? "", modalBody);
      } else {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              Ocurrió un error, verifique los datos e intente nuevamente
            </p>
          </div>
        );
        const errorMessage = response.data || "Error desconocido";
        setError("nombres", { type: "server", message: errorMessage });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[50vh]">
      <div className="flex-1 pr-2 overflow-y-scroll scrollbar-custom">
        {/* NOMBRES DEL CLIENTE */}
        <div className="flex flex-col items-start gap-4 my-4">
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
                minLength={3}
                maxLength={50}
                placeholder="Nombres del cliente"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.nombres && (
            <p className="ml-1 text-red-500">{errors.nombres?.message}</p>
          )}
        </div>

        {/* APELLIDOS CLIENTE */}
        <div className="flex flex-col items-start gap-4 my-4">
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
                minLength={3}
                maxLength={50}
                placeholder="Apellidos del cliente"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.apellidos && (
            <p className="ml-1 text-red-500">{errors.apellidos.message}</p>
          )}
        </div>

        {/* GÉNERO DEL CLIENTE */}
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Género</p>
          <Controller
            name="genero"
            control={control}
            rules={{
              required: "Seleccionar una opción es requerido",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id="genero"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              >
                <option value="Ninguno">Seleccione un género</option>
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
        <div className="flex flex-col items-start gap-4 my-4">
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
        <div className="flex flex-col items-start gap-4 my-4">
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
                maxLength={100}
                minLength={5}
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
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Contraseña</p>
          <Controller
            name="password"
            control={control}
            rules={{ required: "La contraseña es requerida" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="password"
                id="password"
                minLength={5}
                maxLength={255}
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
        <div className="flex flex-col items-start gap-4 my-4">
          <p>Teléfono</p>
          <Controller
            name="telefono"
            control={control}
            rules={{ required: "El teléfono es requerido" }}
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
                id="telefono"
                placeholder="Télefono del cliente"
                minLength={1}
                maxLength={12}
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.telefono && (
            <p className="ml-1 text-red-500">{errors.telefono.message}</p>
          )}
        </div>

        {/* ESTATUS DEL CLIENTE */}
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
          {errors.estatus && (
            <p className="ml-1 text-red-500">{errors.estatus.message}</p>
          )}
        </div>

        {/* TIPO DEL CLIENTE */}
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

      {/* BOTONES PARA CERRAR Y AGREGAR */}
      <div className="flex justify-center w-full gap-4 pt-4 h-fit">
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 rounded-lg bg-neutral-500 hover:bg-neutral-400"
          onClick={() => setModal(false, modalTitle ?? "", modalBody)}
        >
          Cerrar
        </button>
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-500"
          onClick={handleSubmit(onSubmit)}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
