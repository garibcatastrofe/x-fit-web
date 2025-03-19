import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { updateEmpleado } from "../../../api/Empleados/updateEmpleado";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useModal } from "../../../stores/Modal/modalStore";
import { EmpleadoPrimitive } from "../../../types/Empleados/EmpleadoPrimitive";

export function ModalBodyUpdate({ dato }: { dato: EmpleadoPrimitive }) {
  const { setModal, modalTitle, modalBody } = useModal();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      empleado_id: dato.empleado.id,
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
      usuario_id: dato.usuario.id,
    },
    shouldUnregister: false,
  });

  const { setMensaje } = useMessageUpdated();

  useEffect(() => {
    if (dato) {
      reset({
        empleado_id: dato.empleado.id ?? 0,
        nombres: dato.usuario.nombres ?? "",
        apellidos: dato.usuario.apellidos ?? "",
        genero: dato.usuario.genero ?? "",
        fecha_nacimiento: dato.usuario.fecha_nacimiento ?? "",
        correo: dato.usuario.correo ?? "",
        telefono: dato.usuario.telefono ?? "",
        estatus: dato.usuario.estatus ?? "",
        puesto: dato.empleado.puesto ?? "",
        is_admin: dato.empleado.is_admin ?? "",
        usuario_id: dato.usuario.id ?? 0,
      });
    }
  }, [dato, reset]);

  const onSubmit = async (data: {
    empleado_id: number;
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
    usuario_id: number;
  }) => {
    try {
      const response = await updateEmpleado({
        ...data, // ✅ Mantiene los datos del formulario
        setMensaje, // ✅ Se pasa como argumento separado
      });
      if (
        response?.message &&
        response.message.includes("actualizado exitosamente")
      ) {
        alert("Empleado actualizado correctamente");
        setModal(false, modalTitle ?? "", modalBody);
      } else {
        alert("Error al actualizar empleado.");
      }
    } catch (error) {
      console.log(error);
      alert("Error al actualizar empleado.");
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[50vh]">
      {/* ID DEL EMPLEADO */}
      <Controller
        name="empleado_id"
        control={control}
        render={({ field }) => (
          <input {...field} type="hidden" value={field.value} />
        )}
      />

      {/* NOMBRE */}
      <div className="flex-1 pr-2 overflow-y-scroll scrollbar-custom">
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
                placeholder="Ingrese los nombres"
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

        {/* CORREO */}
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

        {/* PASSWORD */}
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

        {/* TELÉFONO */}
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
                placeholder="Teléfono del cliente"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.telefono && (
            <p className="ml-1 text-red-500">{errors.telefono.message}</p>
          )}
        </div>

        {/* ESTATUS */}
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

        {/* PUESTO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Puesto</p>
          <Controller
            name="puesto"
            control={control}
            rules={{ required: "Seleccionar una opción es requerido" }}
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

        {/* IS_ADMIN */}
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
                id="tipo"
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
