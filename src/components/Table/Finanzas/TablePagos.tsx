/* LIBRERIAS */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import { IoOptions } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { LuTrash2 } from "react-icons/lu";
import { IoIosArrowRoundBack } from "react-icons/io";
import { TbCalendarDown } from "react-icons/tb";
import { FaRegFilePdf } from "react-icons/fa6";

/* FETCH */
import { selectAllPagos } from "../../../api/Pagos/selectAllPagos";

/* STORES */
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useModal } from "../../../stores/Modal/modalStore";
import { useFilterModal } from "../../../stores/ModalFilter/modalFilterStore";

/* TYPES */
import { ConsultaPago } from "../../../types/Pagos/ConsultaPago";
import { PagoPrimitive } from "../../../types/Pagos/PagoPrimitive";

/* FUNCTIONS */
import { formatearFecha } from "../../../functions/date";

/* COMPONENTS */
import { ButtonCuadrado } from "./../components/ButtonCuadrado";
import { ModalBodyAdd } from "../../Modal/Pagos/ModalBodyAdd";
import { ModalBodyFilter } from "../../Modal/Pagos/ModalBodyFilter";
import { ModalBodyUpdate } from "../../Modal/Pagos/ModalBodyUpdate";
import { ModalBodyDelete } from "../../Modal/Pagos/ModalBodyDelete";
import { ModalBodyReporteEntreFechas } from "../../Modal/Pagos/ModalBodyReporteEntreFechas";

export function TablePagos({ columns }: { columns: string[] }) {
  const { setModalFilter, modalFilter } = useFilterModal();
  const [data, setData] = useState<ConsultaPago>();
  const [irSiguiente, setIrSiguiente] = useState(false);
  const { setMensaje, mensaje } = useMessageUpdated();
  const { setModal } = useModal();
  const navigate = useNavigate();

  const buscarPagos = async () => {
    const pagos: ConsultaPago = await selectAllPagos({
      needData: { buscarDesdeModal: false, data: null },
      buscarSiguiente: false,
    });

    setData(pagos);
  };

  const buscarSiguiente = async () => {
    const pagos = await selectAllPagos({
      needData: { buscarDesdeModal: false, data: null },
      buscarSiguiente: true,
    });
    if (pagos.data.length === 0) {
      setIrSiguiente(false);
    } else {
      setIrSiguiente(true);
    }
  };

  const openEditDeleteModal = async (
    id: number,
    dato: PagoPrimitive,
    accion: "EDITAR" | "ELIMINAR"
  ) => {
    try {
      if (accion == "EDITAR") {
        //console.log(`Pago: `, dato.id);
        setModal(true, "Ver pago", <ModalBodyUpdate dato={dato} />);
      } else {
        setModal(true, "Eliminar pago", <ModalBodyDelete id={id} />);
      }
    } catch (error) {
      console.error("Error al obtener cliente", error);
    }
  };

  useEffect(() => {
    setModalFilter({
      perPage: 10,
      page: 1,
      order: "desc",
      orderBy: "id",
      eqAtribute: "ninguno",
      atribute: "0",
      checkFilters: false,
      filters: [],
    });
    buscarPagos();
  }, [setModalFilter]);

  useEffect(() => {
    buscarSiguiente();
  }, [data]);

  useEffect(() => {
    if (mensaje?.msj != null) {
      if (mensaje.msj === "ELIMINADO") {
        setMensaje({ msj: "VACIO" });
        setModalFilter({
          perPage: modalFilter?.perPage == null ? 10 : modalFilter.perPage,
          page: 1,
          order: modalFilter?.order == null ? "asc" : modalFilter.order,
          orderBy: modalFilter?.orderBy == null ? "id" : modalFilter.orderBy,
          eqAtribute:
            modalFilter?.eqAtribute == null ? "id" : modalFilter.eqAtribute,
          atribute: modalFilter?.atribute == null ? "0" : modalFilter.atribute,
          checkFilters:
            modalFilter?.checkFilters == null
              ? false
              : modalFilter.checkFilters,
          filters: modalFilter?.filters == null ? [] : modalFilter.filters,
        });
        buscarPagos();
      } else if (mensaje.msj === "AGREGADO") {
        setMensaje({ msj: "VACIO" });
        setModalFilter({
          perPage: modalFilter?.perPage == null ? 10 : modalFilter.perPage,
          page: 1,
          order: modalFilter?.order == null ? "asc" : modalFilter.order,
          orderBy: modalFilter?.orderBy == null ? "id" : modalFilter.orderBy,
          eqAtribute:
            modalFilter?.eqAtribute == null ? "id" : modalFilter.eqAtribute,
          atribute: modalFilter?.atribute == null ? "0" : modalFilter.atribute,
          checkFilters:
            modalFilter?.checkFilters == null
              ? false
              : modalFilter.checkFilters,
          filters: modalFilter?.filters == null ? [] : modalFilter.filters,
        });
        buscarPagos();
      } else if (mensaje.msj === "FILTRADO") {
        buscarPagos();
      }
    }
  }, [mensaje]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center justify-between gap-4 p-6 lg:flex-row md:flex-row">
        <div className="flex justify-center w-full gap-4 lg:justify-normal md:justify-normal">
          {/* BOTÓN IR HACIA ATRÁS */}
          <ButtonCuadrado
            action={() => navigate("/finance")}
            Icon={IoIosArrowRoundBack}
            rotate={false}
            color="bg-red-600"
          />

          {/* BOTÓN FILTRAR */}
          <ButtonCuadrado
            action={() => setModal(true, "Filtrar pagos", <ModalBodyFilter />)}
            Icon={IoOptions}
            rotate={false}
            color="bg-red-600"
          />

          {/* BOTÓN IMPRIMIR */}
          <ButtonCuadrado
            action={() =>
              setModal(true, "Generar reporte", <ModalBodyReporteEntreFechas />)
            }
            Icon={TbCalendarDown}
            rotate={false}
            color="bg-red-600"
          />

          {/* BOTÓN AGREGAR */}
          <ButtonCuadrado
            action={() => setModal(true, "Agregar pago", <ModalBodyAdd />)}
            Icon={IoIosAdd}
            rotate={false}
            color="bg-red-600"
          />
        </div>
        <div className="flex justify-between w-full gap-4 lg:justify-end md:justify-end">
          {/* BOTÓN ANTERIOR */}
          <button
            onClick={() => {
              setModalFilter({
                perPage:
                  modalFilter?.perPage == null ? 10 : modalFilter.perPage,
                page: modalFilter?.page == null ? 0 : modalFilter.page - 1,
                order: modalFilter?.order == null ? "asc" : modalFilter.order,
                orderBy:
                  modalFilter?.orderBy == null ? "id" : modalFilter.orderBy,
                eqAtribute:
                  modalFilter?.eqAtribute == null
                    ? "id"
                    : modalFilter.eqAtribute,
                atribute:
                  modalFilter?.atribute == null ? "0" : modalFilter.atribute,
              });
              buscarPagos();
            }}
            disabled={modalFilter?.page == 0 ? true : false}
            className={`px-4 py-2 font-medium rounded-lg ${
              modalFilter?.page == 0
                ? "bg-neutral-400 text-neutral-200"
                : "bg-red-600 text-white"
            }`}
          >
            Anterior
          </button>

          {/* BOTÓN SIGUIENTE */}
          <button
            onClick={() => {
              setModalFilter({
                perPage:
                  modalFilter?.perPage == null ? 10 : modalFilter.perPage,
                page: modalFilter?.page == null ? 0 : modalFilter.page + 1,
                order: modalFilter?.order == null ? "asc" : modalFilter.order,
                orderBy:
                  modalFilter?.orderBy == null ? "id" : modalFilter.orderBy,
                eqAtribute:
                  modalFilter?.eqAtribute == null
                    ? "id"
                    : modalFilter.eqAtribute,
                atribute:
                  modalFilter?.atribute == null ? "0" : modalFilter.atribute,
              });
              buscarPagos();
            }}
            disabled={irSiguiente ? false : true}
            className={`px-4 py-2 font-medium rounded-lg ${
              irSiguiente
                ? "bg-red-600 text-white"
                : "bg-neutral-400 text-neutral-200"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-y-auto scrollbar-custom">
        <motion.div
          className="relative w-full h-full overflow-x-auto overflow-y-auto scrollbar-custom"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* MENSAJE DE NO ENCONTRADOS o TABLA */}
          {data?.count === 0 ? (
            <p>No se encontraron pagos</p>
          ) : (
            <table className="w-full">
              <thead className="sticky top-0 rounded-lg">
                {/* FILA HEADERS */}
                <tr className="rounded-lg bg-neutral-100">
                  {/* Por cada columna que llegó del prop columns, hacer un header */}
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className={`font-medium py-4 text-left text-green-950 ${
                        column === "Editar" || column === "Eliminar"
                          ? "px-3 lg:pl-3 md:px-4"
                          : "px-3"
                      }`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {/* 
                  FILA DE INFORMACIÓN 
                  Por cada entidad que haya en data, imprimir sus respectivas filas
                */}
                {data == null ? (
                  <tr>
                    <td></td>
                  </tr>
                ) : (
                  data.data.map((dato, index) => (
                    <tr
                      key={index}
                      className="border-b border-neutral-200 hover:bg-neutral-100/70"
                    >
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {dato.id}
                      </td>
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {dato.monto}
                      </td>
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {formatearFecha(dato.fecha_pago)}
                      </td>
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {formatearFecha(dato.fecha_vencimiento)}
                      </td>
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {dato.membresia_nombre}
                      </td>
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {dato.promocion_nombre}
                      </td>
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {typeof dato.cliente_nombre === "string"
                          ? dato.cliente_nombre
                          : ""}
                      </td>
                      <td className="px-3 py-6 whitespace-nowrap">
                        <motion.div
                          onClick={() =>
                            openEditDeleteModal(dato.id, dato, "EDITAR")
                          }
                          className="p-2 rounded-lg hover:cursor-pointer w-fit hover:bg-red-100"
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <FaRegFilePdf className="text-2xl text-red-600" />
                        </motion.div>
                      </td>
                      <td className="px-3 py-6 whitespace-nowrap">
                        <motion.div
                          onClick={() =>
                            openEditDeleteModal(dato.id, dato, "ELIMINAR")
                          }
                          className="p-2 rounded-lg hover:cursor-pointer w-fit hover:bg-red-100"
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <LuTrash2 className="text-2xl text-red-600" />
                        </motion.div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </motion.div>
      </div>

      <div className="flex flex-col justify-center p-6 lg:justify-between md:justify-between lg:flex-row md:flex-row">
        <div>
          <p>
            Total:{" "}
            <span className="font-semibold text-red-600">{data?.count}</span>{" "}
            pagos
          </p>
        </div>
        <div>
          <p>
            Página: {(modalFilter?.page ?? 0) + 1} de{" "}
            {Math.ceil((data?.count ?? 0) / (modalFilter?.perPage ?? 1)) === 0
              ? "1"
              : Math.ceil((data?.count ?? 0) / (modalFilter?.perPage ?? 1))}
          </p>
        </div>
      </div>
    </div>
  );
}
