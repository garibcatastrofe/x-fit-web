/* LIBRERIAS */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import { IoOptions } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { LuTrash2 } from "react-icons/lu";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiEdit } from "react-icons/fi";

/* FETCH */
import { selectAllMembresias } from "../../../api/Membresias/selectAllMembresias";

/* STORES */
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useModal } from "../../../stores/Modal/modalStore";
import { useFilterModal } from "../../../stores/ModalFilter/modalFilterStore";

/* TYPES */
import { ConsultaMembresia } from "../../../types/Membresias/ConsultaMembresia";
import { Membresia } from "../../../types/Membresias/Membresia";

/* COMPONENTS */
import { ButtonCuadrado } from "./../components/ButtonCuadrado";
import { ModalBodyAdd } from "../../Modal/Membresias/ModalBodyAdd";
import { ModalBodyUpdate } from "../../Modal/Membresias/ModalBodyUpdate";
import { ModalBodyDelete } from "../../Modal/Membresias/ModalBodyDelete";
import { ModalBodyFilter } from "../../Modal/Membresias/ModalBodyFilter";
/* 


 */

export function TableMembresias({ columns }: { columns: string[] }) {
  const { setModalFilter, modalFilter } = useFilterModal();
  const [data, setData] = useState<ConsultaMembresia>();
  const [irSiguiente, setIrSiguiente] = useState(false);
  const { setMensaje, mensaje } = useMessageUpdated();
  const { setModal } = useModal();
  const navigate = useNavigate();

  const buscarMembresias = async () => {
    const membresias: ConsultaMembresia = await selectAllMembresias({
      buscarSiguiente: false,
      buscarModalFilter: true,
    });

    setData(membresias);
  };

  const buscarSiguiente = async () => {
    const membresias = await selectAllMembresias({
      buscarSiguiente: true,
      buscarModalFilter: true,
    });
    if (membresias.data.length === 0) {
      setIrSiguiente(false);
    } else {
      setIrSiguiente(true);
    }
  };

  const openEditDeleteModal = async (
    id: number,
    dato: Membresia,
    accion: "EDITAR" | "ELIMINAR"
  ) => {
    try {
      if (accion == "EDITAR") {
        //console.log(`Pago: `, dato.id);
        setModal(true, "Editar membresía", <ModalBodyUpdate dato={dato} />);
      } else {
        setModal(
          true,
          "Eliminar membresía",
          <ModalBodyDelete id={id} nombre={dato.nombre} />
        );
      }
    } catch (error) {
      console.error("Error al obtener membresía", error);
    }
  };

  useEffect(() => {
    setModalFilter({
      perPage: 10,
      page: 0,
      order: "desc",
      orderBy: "id",
      eqAtribute: "ninguno",
      atribute: "0",
    });
    buscarMembresias();
  }, [setModalFilter]);

  useEffect(() => {
    buscarSiguiente();
  }, [data]);

  useEffect(() => {
    if (mensaje?.msj != null) {
      if (mensaje.msj === "ACTUALIZADO") {
        setMensaje({ msj: "VACIO" });
        setModalFilter({
          perPage: modalFilter?.perPage == null ? 10 : modalFilter.perPage,
          page: modalFilter?.page == null ? 0 : modalFilter.page,
          order: modalFilter?.order == null ? "asc" : modalFilter.order,
          orderBy: modalFilter?.orderBy == null ? "id" : modalFilter.orderBy,
          eqAtribute:
            modalFilter?.eqAtribute == null ? "id" : modalFilter.eqAtribute,
          atribute: modalFilter?.atribute == null ? "0" : modalFilter.atribute,
        });
        buscarMembresias();
      } else if (mensaje.msj === "ELIMINADO") {
        setMensaje({ msj: "VACIO" });
        setModalFilter({
          perPage: modalFilter?.perPage == null ? 10 : modalFilter.perPage,
          page: 0,
          order: modalFilter?.order == null ? "asc" : modalFilter.order,
          orderBy: modalFilter?.orderBy == null ? "id" : modalFilter.orderBy,
          eqAtribute:
            modalFilter?.eqAtribute == null ? "id" : modalFilter.eqAtribute,
          atribute: modalFilter?.atribute == null ? "0" : modalFilter.atribute,
        });
        buscarMembresias();
      } else if (mensaje.msj === "AGREGADO") {
        setMensaje({ msj: "VACIO" });
        setModalFilter({
          perPage: modalFilter?.perPage == null ? 10 : modalFilter.perPage,
          page: 0,
          order: modalFilter?.order == null ? "asc" : modalFilter.order,
          orderBy: modalFilter?.orderBy == null ? "id" : modalFilter.orderBy,
          eqAtribute:
            modalFilter?.eqAtribute == null ? "id" : modalFilter.eqAtribute,
          atribute: modalFilter?.atribute == null ? "0" : modalFilter.atribute,
        });
        buscarMembresias();
      } else if (mensaje.msj === "FILTRADO") {
        buscarMembresias();
      }
    }
  }, [
    mensaje,
    setMensaje,
    modalFilter?.order,
    modalFilter?.orderBy,
    modalFilter?.page,
    modalFilter?.perPage,
    modalFilter?.eqAtribute,
    modalFilter?.atribute,
    setModalFilter,
  ]);

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
            action={() =>
              setModal(true, "Filtrar membresías", <ModalBodyFilter />)
            }
            Icon={IoOptions}
            rotate={false}
            color="bg-red-600"
          />

          {/* BOTÓN AGREGAR */}
          <ButtonCuadrado
            action={() => setModal(true, "Agregar membresía", <ModalBodyAdd />)}
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
              buscarMembresias();
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
              buscarMembresias();
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
                        {dato.membresia.nombre}
                      </td>
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {dato.membresia.precio}
                      </td>
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {dato.membresia.duracion_meses}
                      </td>
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {dato.membresia.tipo}
                      </td>
                      <td className="px-3 py-6 whitespace-nowrap">
                        <motion.div
                          onClick={() =>
                            openEditDeleteModal(
                              dato.membresia.id,
                              dato.membresia,
                              "EDITAR"
                            )
                          }
                          className="p-2 rounded-lg hover:cursor-pointer w-fit hover:bg-blue-100"
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <FiEdit className="text-2xl text-blue-600" />
                        </motion.div>
                      </td>
                      <td className="px-3 py-6 whitespace-nowrap">
                        <motion.div
                          onClick={() =>
                            openEditDeleteModal(
                              dato.membresia.id,
                              dato.membresia,
                              "ELIMINAR"
                            )
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
            membresias
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
