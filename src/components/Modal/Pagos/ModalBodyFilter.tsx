import { useFilterModal } from "../../../stores/ModalFilter/modalFilterStore";
import { useForm, Controller } from "react-hook-form";
import { useModal } from "../../../stores/Modal/modalStore";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { selectAllMembresias } from "../../../api/Membresias/selectAllMembresias";
import { selectAllPromociones } from "../../../api/Promociones/selectAllPromociones";
import { useEffect, useState } from "react";
import { Promocion } from "../../../types/Promociones/Promocion";
import { useAnnouncement } from "../../../stores/Announcement/announcementStore";
import { FaCircleCheck } from "react-icons/fa6";
import { ConsultaMembresia } from "../../../types/Membresias/ConsultaMembresia";

export function ModalBodyFilter() {
  const { setModal, modalTitle, modalBody } = useModal();
  const { setMensaje } = useMessageUpdated();
  const { setModalFilter } = useFilterModal();
  const [membresias, setMembresias] = useState<ConsultaMembresia>();
  const [promociones, setPromociones] = useState<Promocion[]>([]);
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

    setMensaje({ msj: "FILTRADO" });
    /* console.log("Filtro aplicado"); */
    setAnnouncement(
      true,
      "bg-green-500",
      <div className="flex items-center justify-center gap-4">
        <FaCircleCheck className="text-xl text-white" />
        <p className="font-medium text-white">Filtro aplicado</p>
      </div>
    );
    reset();
    setModal(false, modalTitle ?? "", modalBody);
  };

  useEffect(() => {
    const obtenerMembresias = async () => {
      const consulta = await selectAllMembresias({
        buscarSiguiente: false,
        buscarModalFilter: false,
      });
      setMembresias(consulta);
    };

    const obtenerPromociones = async () => {
      const consulta = await selectAllPromociones({
        buscarSiguiente: false,
        buscarModalFilter: false,
      });
      setPromociones(consulta);
    };

    obtenerMembresias();
    obtenerPromociones();
  }, []);

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
                <option value="monto">Monto</option>
                <option value="fecha_pago">Fecha pago</option>
                <option value="fecha_vencimiento">Vencimiento</option>
                <option value="membresia_id">Membresia</option>
                <option value="promocion_id">Promoción</option>
                <option value="cliente_id">Cliente</option>
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
                <option value="monto">Monto</option>
                <option value="fecha_pago">Fecha pago</option>
                <option value="fecha_vencimiento">Vencimiento</option>
                <option value="membresia_id">Membresia</option>
                <option value="promocion_id">Promoción</option>
                <option value="cliente_id">Cliente</option>
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
                  {["fecha_pago", "fecha_vencimiento"].includes(
                    selectedAttribute
                  ) && (
                    <input
                      {...field}
                      type="date"
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl"
                    />
                  )}
                  {["monto", "id", "cliente_id"].includes(
                    selectedAttribute
                  ) && (
                    <input
                      {...field}
                      placeholder={`${
                        selectedAttribute === "monto"
                          ? "Ingrese el monto"
                          : selectedAttribute === "id"
                          ? "Ingrese el ID del pago"
                          : "Ingrese el ID del cliente"
                      }`}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                        field.onChange(val); // Actualiza el estado con solo números
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "e" || e.key === "-" || e.key === "+") {
                          e.preventDefault(); // Bloquea la entrada de estos caracteres
                        }
                      }}
                      type="text" // Cambia a "text" para evitar comportamientos extraños con números
                      inputMode="numeric" // Ayuda en móviles
                      pattern="[0-9]*" // Solo números
                      id="id"
                      minLength={1}
                      maxLength={12}
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl"
                    />
                  )}
                  {selectedAttribute === "membresia_id" && (
                    <select
                      {...field}
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl scrollbar-custom"
                      size={5}
                    >
                      <option value="ninguno">Seleccione una membresía</option>
                      {membresias?.data.map((membresia, index) => (
                        <option key={index} value={membresia.membresia.id}>
                          {membresia.membresia.nombre}
                        </option>
                      ))}
                    </select>
                  )}
                  {selectedAttribute === "promocion_id" && (
                    <select
                      {...field}
                      className="w-full p-4 border-2 border-gray-100 outline-none rounded-xl scrollbar-custom"
                      size={5}
                    >
                      <option value="ninguno">Seleccione una promoción</option>
                      {promociones.map((promocion, index) => (
                        <option key={index} value={promocion.id}>
                          {promocion.nombre}
                        </option>
                      ))}
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
