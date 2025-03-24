import { useForm, Controller } from "react-hook-form";
import { addEmpleado } from "../../../api/Empleados/addEmpleado";
import { useModal } from "../../../stores/Modal/modalStore";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";

export function ModalBodyAdd() {
  const { setModal, modalTitle, modalBody } = useModal();
  const { setMensaje } = useMessageUpdated();

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
      puesto: "",
      is_admin: "",
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
    puesto: string;
    is_admin: string;
  }) => {
    try {
      const formattedData = {
        ...data,
        setMensaje: setMensaje,
      };

      //console.log("Datos a enviar:", formattedData); // Agrega esto para verificar

      if (formattedData.genero === "Ninguno") {
        setError("genero", { type: "server", message: "Seleccione un género" });
        return;
      } else if (formattedData.estatus === "Ninguno") {
        setError("estatus", {
          type: "server",
          message: "Seleccione un estatus",
        });
        return;
      } else if (formattedData.is_admin === "Ninguno") {
        setError("is_admin", {
          type: "server",
          message: "Seleccione si es admin",
        });
        return;
      } else if(formattedData.puesto === "Ninguno") {
        setError("puesto", {
          type: "server",
          message: "Seleccione un puesto"
        })
      }

      const response = await addEmpleado(formattedData);

      if (response === "Ya existe un usuario con ese correo") {
        setError("correo", { type: "server", message: response });
        alert("Ya existe un usuario con ese correo, intente con otro porfavor");
        return;
      }

      if (response.message === "Empleado creado exitosamente") {
        //console.log("response", response);
        alert("Empleado agregado correctamente");
        reset();
        setModal(false, modalTitle ?? "", modalBody);
      } else {
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
        {/* NOMBRES DEL EMPLEADO */}
        <div className="flex flex-col items-start gap-4 mb-2">
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
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.nombres && (
            <p className="ml-1 text-red-500">{errors.nombres?.message}</p>
          )}
        </div>

        {/* APELLIDOS EMPLEADO */}
        <div className="flex flex-col items-start gap-4 mb-2">
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
                placeholder="Apellidos del cliente"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.apellidos && (
            <p className="ml-1 text-red-500">{errors.apellidos.message}</p>
          )}
        </div>

        {/* GÉNERO DEL EMPLEADO */}
        <div className="flex flex-col items-start gap-4 mb-2">
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

        {/* FECHA DE NACIMIENTO DEL EMPLEADO */}
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

        {/* CORREO DEL EMPLEADO */}
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

        {/* PASSWORD DEL EMPLEADO */}
        <div className="flex flex-col items-start gap-4 mb-2">
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
                placeholder="**********"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.password && (
            <p className="ml-1 text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* TELÉFONO DEL EMPLEADO */}
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

        {/* ESTATUS DEL EMPLEADO */}
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

        {/* PUESTO DEL EMPLEADO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Puesto</p>
          <Controller
            name="puesto"
            control={control}
            rules={{
              required: "Seleccionar una opción es requerido",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id="puesto"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              >
                <option value="Ninguno">Seleccione un puesto</option>
                <option value="ENTRENADOR">ENTRENADOR</option>
                <option value="SISTEMAS">SISTEMAS</option>
                <option value="RECEPCION">RECEPCIÓN</option>
              </select>
            )}
          />
          {errors.puesto && (
            <p className="ml-1 text-red-500">{errors.puesto.message}</p>
          )}
        </div>

        {/* IS ADMIN DEL EMPLEADO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Admin</p>
          <Controller
            name="is_admin"
            control={control}
            rules={{
              required: "Seleccionar una opción es requerido",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id="is_admin"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              >
                <option value="Ninguno">Seleccione si es admin</option>
                <option value="SI">SI</option>
                <option value="NO">NO</option>
              </select>
            )}
          />
          {errors.is_admin && (
            <p className="ml-1 text-red-500">{errors.is_admin.message}</p>
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
