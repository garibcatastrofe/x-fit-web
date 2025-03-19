import { useFilterModal } from "../../../stores/ModalFilter/modalFilterStore";
import { useForm, Controller } from "react-hook-form";
import { useModal } from "../../../stores/Modal/modalStore";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";

export function ModalBodyFilter() {
  const { setModal, modalTitle, modalBody } = useModal();
  const { setMensaje } = useMessageUpdated();
  const { setModalFilter } = useFilterModal();

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      cantidad: "10",
      orden: "asc",
      orderBy: "id",
      eqAtribute: "ninguno",
      atribute: "",
    },
  });

  const selectedAttribute = watch("eqAtribute"); // Observa cambios en el select

  const handleFilterChange = (data: {
    cantidad: string;
    orden: string;
    orderBy: string;
    eqAtribute: string;
    atribute: string;
  }) => {
    console.log("Valores enviados:");
    console.log(
      `perPage: ${data.cantidad}, page: 0, order: ${data.orden}, orderBy: ${data.orderBy}, eqAtribute: ${data.eqAtribute}, atribute: ${data.atribute}`
    );

    setModalFilter({
      perPage: Number(data.cantidad),
      page: 0,
      order: data.orden,
      orderBy: data.orderBy,
      eqAtribute: data.eqAtribute,
      atribute: data.atribute,
    });

    setMensaje({ msj: "FILTRADO" });
    console.log("Filtro aplicado");
    reset();
    setModal(false, modalTitle ?? "", modalBody);
  };

  return (
    <div className="flex flex-col h-full max-h-[50vh]">
      <div className="flex-1 pr-2 overflow-y-scroll scrollbar-custom">
        {/* CANTIDAD DE REGISTROS */}
        <div className="flex flex-col items-start gap-4 mb-4">
          <p>Cantidad</p>
          <Controller
            name="cantidad"
            control={control}
            rules={{
              required: "Seleccionar una cantidad es requerido",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            )}
          />
        </div>

        {/* ORDEN DE REGISTROS */}
        <div className="flex flex-col items-start gap-4 pr-2 mb-4">
          <p>Orden</p>
          <Controller
            name="orden"
            control={control}
            rules={{
              required: "Seleccionar un orden",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            )}
          />
        </div>

        {/* DATO A ORDENAR REGISTROS */}
        <div className="flex flex-col items-start gap-4 pr-2 mb-4">
          <p>Ordenar por</p>
          <Controller
            name="orderBy"
            control={control}
            rules={{
              required: "Seleccionar un dato para ordenar",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              >
                <option value="id">ID</option>
                <option value="nombres">Nombres</option>
                <option value="apellidos">Apellidos</option>
                <option value="genero">Género</option>
                <option value="fecha_nacimiento">Fecha nacimiento</option>
                <option value="genero">Género</option>
                <option value="correo">Correo</option>
                <option value="telefono">Teléfono</option>
                <option value="estatus">Estatus</option>
                <option value="puesto">Puesto</option>
                <option value="is_admin">Admin</option>
              </select>
            )}
          />
        </div>

        {/* DATO ESPECÍFICO */}
        <div className="flex flex-col items-start gap-4 pr-2 mb-4">
          <p>Dato específico</p>
          <Controller
            name="eqAtribute"
            control={control}
            rules={{
              required: "Seleccionar un dato específico a buscar",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              >
                <option value="ninguno">Ninguno</option>
                <option value="id">ID</option>
                <option value="nombres">Nombres</option>
                <option value="apellidos">Apellidos</option>
                <option value="genero">Género</option>
                <option value="fecha_nacimiento">Fecha nacimiento</option>
                <option value="correo">Correo</option>
                <option value="telefono">Teléfono</option>
                <option value="estatus">Estatus</option>
                <option value="puesto">Puesto</option>
                <option value="is_admin">Admin</option>
              </select>
            )}
          />
        </div>

        {/* INPUT DINÁMICO */}
        {selectedAttribute && selectedAttribute !== "ninguno" && (
          <div className="flex flex-col items-start gap-4 pr-2 mb-4">
            <p>Valor</p>
            <Controller
              name="atribute"
              control={control}
              render={({ field }) => (
                <>
                  {[
                    "nombres",
                    "apellidos",
                    "correo",
                    "telefono",
                    "puesto",
                  ].includes(selectedAttribute) && (
                    <input
                      {...field}
                      type="text"
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl"
                    />
                  )}
                  {["fecha_nacimiento"].includes(selectedAttribute) && (
                    <input
                      {...field}
                      type="date"
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl"
                    />
                  )}
                  {selectedAttribute === "id" && (
                    <input
                      {...field}
                      type="number"
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl"
                    />
                  )}
                  {selectedAttribute === "genero" && (
                    <select
                      {...field}
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl"
                    >
                      <option value="ninguno">Seleccione un género</option>
                      <option value="F">Femenino</option>
                      <option value="M">Masculino</option>
                    </select>
                  )}
                  {selectedAttribute === "estatus" && (
                    <select
                      {...field}
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl"
                    >
                      <option value="ninguno">Seleccione un estatus</option>
                      <option value="ACTIVO">ACTIVO</option>
                      <option value="INACTIVO">INACTIVO</option>
                    </select>
                  )}
                  {selectedAttribute === "is_admin" && (
                    <select
                      {...field}
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl"
                    >
                      <option value="ninguno">Seleccione si es admin</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                    </select>
                  )}
                </>
              )}
            />
          </div>
        )}
      </div>

      {/* BOTONES PARA CERRAR Y FILTAR */}
      <div className="flex justify-center w-full gap-4 pt-4 h-fit">
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 rounded-lg bg-neutral-500 hover:bg-neutral-400"
          onClick={() => setModal(false, modalTitle ?? "", modalBody)}
        >
          Cerrar
        </button>
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-500"
          onClick={handleSubmit(handleFilterChange)}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}
