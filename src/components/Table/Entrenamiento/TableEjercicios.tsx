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
import { selectAllEjercicios } from "../../../api/Ejercicios/selectAllEjercicios";

/* STORES */
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useModal } from "../../../stores/Modal/modalStore";
import { useFilterModal } from "../../../stores/ModalFilter/modalFilterStore";

/* TYPES */
import { ConsultaEjercicio } from "../../../types/Ejercicios/ConsultaEjercicio";
import { EjercicioPrimitive } from "../../../types/Ejercicios/EjercicioPrimitive";
import { Ejercicio } from "../../../types/Ejercicios/Ejercicio";

/* COMPONENTS */
import { ButtonCuadrado } from "../components/ButtonCuadrado";
/* import { ModalBodyAdd } from "../../Modal/Clientes/ModalBodyAdd";
import { ModalBodyFilter } from "../../Modal/Clientes/ModalBodyFilter";
import { ModalBodyUpdate } from "../../Modal/Clientes/ModalBodyUpdate";
import { ModalBodyDelete } from "../../Modal/Clientes/ModalBodyDelete"; */

export function TableEjercicios({ columns }: { columns: string[] }) {
  /* 
    Se tienen que tener dos estados, uno para ir hacía atras en la paginación y otro para ir hacía adelante
    Por default, se buscarán siempre los primeros 10 en forma descendente ordenados por grupo muscular.

    -> Una vez encontrados los primeros 10, se deberá poner el PRIMER documento en un estado que sirva como pila  para que cada documento que se encuentre ahí haga de puntero para ir hacía ATRAS.
    -> También se deberá tener otro estado para poner el ÚLTIMO documento que de igual forma servirá de puntero para ir hacía ADELANTE.

    Las busquedas de los botones Anterior y Siguiente funcionarán con estos punteros.
    Si se mueve efectivamente hacía atras, se deberá eliminar el último elemento de ambas pilas.
    Si se mueve efectivamente hacía adelante, se deberá agregar el primer elemento al estado de primeros, y se deberá agregar el último elemento al estado de últimos.
  */

  const { setModalFilter, modalFilter } = useFilterModal();
  const { setModal } = useModal();
  const navigate = useNavigate();

  const openEditDeleteModal = async (
    id: string,
    dato: Ejercicio,
    accion: "EDITAR" | "ELIMINAR"
  ) => {
    try {
      if (accion == "EDITAR") {
        //console.log(`Usuario: ${dato.usuario}, Cliente: ${dato.cliente}`);
        setModal(
          true,
          "Actualizar ejercicio",
          <>
            {/* <ModalBodyUpdate dato={dato} /> */}
            <p>Modal body update ejercicio: {id}</p>
          </>
        );
      } else {
        setModal(
          true,
          "Eliminar ejercicio",
          <>
            {/* <ModalBodyDelete id={id} /> */}
            <p>Modal body delete ejercicio: {dato.nombre}</p>
          </>
        );
      }
    } catch (error) {
      console.error("Error al obtener ejercicio", error);
    }
  };

  const [data, setData] = useState<ConsultaEjercicio>();
  const [irSiguiente, setIrSiguiente] = useState(false);
  const { setMensaje, mensaje } = useMessageUpdated();
  const [docsPrimeros, setDocsPrimeros] = useState<EjercicioPrimitive[]>([]);
  const [docsUltimos, setDocsUltimos] = useState<EjercicioPrimitive[]>([]);

  const searchExercises = async ({
    siguiente,
    updatedPrimeros,
    updatedUltimos,
  }: {
    siguiente: boolean;
    updatedPrimeros: EjercicioPrimitive[];
    updatedUltimos: EjercicioPrimitive[];
  }) => {
    const ejercicios: ConsultaEjercicio = await selectAllEjercicios({
      buscarSiguiente: siguiente,
      docAnterior:
        updatedPrimeros.length > 0
          ? updatedPrimeros[updatedPrimeros.length - 1]
          : null,
      docSiguiente:
        updatedUltimos.length > 0
          ? updatedUltimos[updatedUltimos.length - 1]
          : null,
    });

    setData(ejercicios);

    if (ejercicios.data.length > 0) {
      setDocsPrimeros((prev) => {
        const nuevoElemento = ejercicios.data[0];
        return prev.some(
          (doc) => doc.ejercicio.id === nuevoElemento.ejercicio.id
        )
          ? prev
          : [...prev, nuevoElemento];
      });

      setDocsUltimos((prev) => {
        const nuevoElemento = ejercicios.data[ejercicios.data.length - 1];
        return prev.some(
          (doc) => doc.ejercicio.id === nuevoElemento.ejercicio.id
        )
          ? prev
          : [...prev, nuevoElemento];
      });
    }
  };

  const searchNext = async () => {
    const ejercicios: ConsultaEjercicio = await selectAllEjercicios({
      buscarSiguiente: true,
      docAnterior:
        docsPrimeros.length > 0 ? docsPrimeros[docsPrimeros.length - 1] : null,
      docSiguiente:
        docsUltimos.length > 0 ? docsUltimos[docsUltimos.length - 1] : null,
    });
    if (ejercicios.data.length === 0) {
      setIrSiguiente(false);
    } else {
      setIrSiguiente(true);
    }
  };

  useEffect(() => {
    setModalFilter({
      perPage: 10,
      page: 0,
      order: "desc",
      orderBy: "grupo_muscular",
      eqAtribute: "",
      atribute: "",
    });
    searchExercises({
      siguiente: true,
      updatedPrimeros: docsPrimeros,
      updatedUltimos: docsUltimos,
    });
  }, [setModalFilter]);

  useEffect(() => {
    searchNext();
  }, [data]);

  useEffect(() => {
    if (mensaje?.msj != null) {
      if (mensaje.msj === "ACTUALIZADO") {
        setMensaje({ msj: "VACIO" });
        setModalFilter({
          perPage: modalFilter?.perPage == null ? 10 : modalFilter.perPage,
          page: modalFilter?.page == null ? 0 : modalFilter.page,
          order: modalFilter?.order == null ? "desc" : modalFilter.order,
          orderBy:
            modalFilter?.orderBy == null
              ? "grupo_muscular"
              : modalFilter.orderBy,
          eqAtribute:
            modalFilter?.eqAtribute == null ? "id" : modalFilter.eqAtribute,
          atribute: modalFilter?.atribute == null ? "0" : modalFilter.atribute,
        });
        searchExercises({
          siguiente: true,
          updatedPrimeros: docsPrimeros,
          updatedUltimos: docsUltimos,
        });
      } else if (mensaje.msj === "ELIMINADO") {
        setMensaje({ msj: "VACIO" });
        setModalFilter({
          perPage: modalFilter?.perPage == null ? 10 : modalFilter.perPage,
          page: 0,
          order: modalFilter?.order == null ? "desc" : modalFilter.order,
          orderBy:
            modalFilter?.orderBy == null
              ? "grupo_muscular"
              : modalFilter.orderBy,
          eqAtribute:
            modalFilter?.eqAtribute == null ? "id" : modalFilter.eqAtribute,
          atribute: modalFilter?.atribute == null ? "0" : modalFilter.atribute,
        });
        searchExercises({
          siguiente: true,
          updatedPrimeros: docsPrimeros,
          updatedUltimos: docsUltimos,
        });
      } else if (mensaje.msj === "AGREGADO") {
        setMensaje({ msj: "VACIO" });
        setModalFilter({
          perPage: modalFilter?.perPage == null ? 10 : modalFilter.perPage,
          page: 0,
          order: modalFilter?.order == null ? "desc" : modalFilter.order,
          orderBy:
            modalFilter?.orderBy == null
              ? "grupo_muscular"
              : modalFilter.orderBy,
          eqAtribute:
            modalFilter?.eqAtribute == null ? "id" : modalFilter.eqAtribute,
          atribute: modalFilter?.atribute == null ? "0" : modalFilter.atribute,
        });
        searchExercises({
          siguiente: true,
          updatedPrimeros: docsPrimeros,
          updatedUltimos: docsUltimos,
        });
      } else if (mensaje.msj === "FILTRADO") {
        searchExercises({
          siguiente: true,
          updatedPrimeros: docsPrimeros,
          updatedUltimos: docsUltimos,
        });
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
            action={() => navigate("/training")}
            Icon={IoIosArrowRoundBack}
            rotate={false}
            color="bg-red-600"
          />

          {/* BOTÓN FILTRAR */}
          <ButtonCuadrado
            action={() =>
              setModal(
                true,
                "Filtrar ejercicios",
                <>
                  {/* <ModalBodyFilter /> */}
                  <p>Modal body filtrar ejercicio</p>
                </>
              )
            }
            Icon={IoOptions}
            rotate={false}
            color="bg-red-600"
          />

          {/* BOTÓN AGREGAR */}
          <ButtonCuadrado
            action={() =>
              setModal(
                true,
                "Agregar ejercicio",
                <>
                  {/* <ModalBodyAdd /> */}
                  <p>Modal body add ejercicio</p>
                </>
              )
            }
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
                order: modalFilter?.order == null ? "desc" : modalFilter.order,
                orderBy:
                  modalFilter?.orderBy == null
                    ? "grupo_muscular"
                    : modalFilter.orderBy,
                eqAtribute:
                  modalFilter?.eqAtribute == null
                    ? "id"
                    : modalFilter.eqAtribute,
                atribute:
                  modalFilter?.atribute == null ? "0" : modalFilter.atribute,
              });
              setDocsPrimeros((prevPrimeros) => {
                const updatedPrimeros = prevPrimeros.slice(0, -1);

                setDocsUltimos((prevUltimos) => {
                  const updatedUltimos = prevUltimos.slice(0, -1);

                  // Llamamos a searchExercises con los valores actualizados
                  searchExercises({
                    siguiente: false,
                    updatedPrimeros,
                    updatedUltimos,
                  });

                  return updatedUltimos; // Retornar el estado actualizado para setDocsUltimos
                });

                return updatedPrimeros; // Retornar el estado actualizado para setDocsPrimeros
              });
            }}
            disabled={docsPrimeros.length === 1 ? true : false}
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
                order: modalFilter?.order == null ? "desc" : modalFilter.order,
                orderBy:
                  modalFilter?.orderBy == null
                    ? "grupo_muscular"
                    : modalFilter.orderBy,
                eqAtribute:
                  modalFilter?.eqAtribute == null
                    ? "id"
                    : modalFilter.eqAtribute,
                atribute:
                  modalFilter?.atribute == null ? "0" : modalFilter.atribute,
              });
              //buscarEjercicios();
              searchExercises({
                siguiente: true,
                updatedPrimeros: docsPrimeros,
                updatedUltimos: docsUltimos,
              });
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
            <p>No se encontraron ejercicios</p>
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
                        {dato.ejercicio.nombre}
                      </td>
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {dato.ejercicio.grupo_muscular}
                      </td>
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {dato.ejercicio.repeticiones}
                      </td>
                      <td className="px-3 py-6 text-left whitespace-nowrap">
                        {dato.ejercicio.descanso}
                      </td>
                      <td className="px-3 py-6 whitespace-nowrap">
                        <motion.div
                          onClick={() =>
                            openEditDeleteModal(
                              dato.ejercicio.id,
                              dato.ejercicio,
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
                              dato.ejercicio.id,
                              dato.ejercicio,
                              "ELIMINAR"
                            )
                          }
                          className="p-2 rounded-lg hover:cursor-pointer w-fit hover:bg-orange-100"
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
            ejercicios
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
