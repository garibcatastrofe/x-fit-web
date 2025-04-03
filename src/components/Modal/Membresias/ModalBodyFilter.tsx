import { useFilterModal } from "../../../stores/ModalFilter/modalFilterStore";
import { useForm, Controller } from "react-hook-form";
import { useModal } from "../../../stores/Modal/modalStore";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useAnnouncement } from "../../../stores/Announcement/announcementStore";
import { FaCircleCheck } from "react-icons/fa6";

export function ModalBodyFilter() {
  const { setModal, modalTitle, modalBody } = useModal();
  const { setMensaje } = useMessageUpdated();
  const { setModalFilter } = useFilterModal();
  const { setAnnouncement } = useAnnouncement();

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      cantidad: "10",
      orden: "desc",
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
    /* console.log("Valores enviados:");
    console.log(
      `perPage: ${data.cantidad}, page: 0, order: ${data.orden}, orderBy: ${data.orderBy}, eqAtribute: ${data.eqAtribute}, atribute: ${data.atribute}`
    ); */

    setModalFilter({
      perPage: Number(data.cantidad),
      page: 0,
      order: data.orden,
      orderBy: data.orderBy,
      eqAtribute: data.eqAtribute,
      atribute: data.atribute,
    });

    setAnnouncement(
      true,
      "bg-green-500",
      <div className="flex items-center justify-center gap-4">
        <FaCircleCheck className="text-xl text-white" />
        <p className="font-medium text-white">Filtro aplicado</p>
      </div>
    );
    setMensaje({ msj: "FILTRADO" });
    //console.log("Filtro aplicado");
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
                <option value="desc">Descendente</option>
                <option value="asc">Ascendente</option>
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
                <option value="nombre">Nombre</option>
                <option value="precio">Precio</option>
                <option value="duracion_meses">Duración (Meses)</option>
                <option value="descripcion">Descripción</option>
                <option value="tipo">Tipo</option>
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
                <option value="nombre">Nombre</option>
                <option value="precio">Precio</option>
                <option value="duracion_meses">Duración (Meses)</option>
                <option value="descripcion">Descripción</option>
                <option value="tipo">Tipo</option>
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
                  {["nombre"].includes(selectedAttribute) && (
                    <input
                      {...field}
                      type="text"
                      id="nombre"
                      minLength={3}
                      maxLength={50}
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl"
                    />
                  )}
                  {["descripcion"].includes(selectedAttribute) && (
                    <textarea
                      {...field}
                      id="descripcion"
                      minLength={25}
                      maxLength={200}
                      placeholder="Descripción de la membresía"
                      className="w-full h-40 p-4 bg-transparent border-2 border-gray-100 outline-none resize-none rounded-xl"
                    />
                  )}
                  {["precio", "duracion_meses"].includes(selectedAttribute) && (
                    <input
                      {...field}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                        field.onChange(val);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "e" || e.key === "-" || e.key === "+") {
                          e.preventDefault(); // Bloquea la entrada de estos caracteres
                        }
                      }}
                      type="text" // Cambia a "text" para evitar comportamientos extraños con números
                      inputMode="numeric" // Ayuda en móviles
                      pattern="[0-9]*" // Solo números
                      id={
                        selectedAttribute === "precio"
                          ? "precio"
                          : "duracion_meses"
                      }
                      placeholder={
                        selectedAttribute === "precio"
                          ? "Precio de la membresía"
                          : "Duración de la membresía"
                      }
                      minLength={1}
                      maxLength={12}
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl"
                    />
                  )}
                  {selectedAttribute === "tipo" && (
                    <select
                      {...field}
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl"
                    >
                      <option value="ninguno">Seleccione un tipo</option>
                      <option value="INDIVIDUAL">INDIVIDUAL</option>
                      <option value="GRUPAL">GRUPAL</option>
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
