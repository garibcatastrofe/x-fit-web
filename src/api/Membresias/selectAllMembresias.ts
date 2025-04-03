import { useFilterModal } from "../../stores/ModalFilter/modalFilterStore";
import { PORT } from "../PORT";
/* import { ConsultaEmpleado } from "../../types/Empleados/ConsultaEmpleado"; */
import { ConsultaMembresia } from "../../types/Membresias/ConsultaMembresia";

export async function selectAllMembresias({
  buscarSiguiente,
  buscarModalFilter,
}: {
  buscarSiguiente: boolean;
  buscarModalFilter: boolean;
}): Promise<ConsultaMembresia> {
  try {
    const { modalFilter } = useFilterModal.getState();

    const perPage = modalFilter?.perPage || 5;

    let page = modalFilter?.page || 0;
    if (buscarSiguiente) {
      page = modalFilter?.page != null ? modalFilter.page + 1 : 0;
    }

    const order = modalFilter?.order || "asc";
    const orderBy = modalFilter?.orderBy || "id";
    const eqAtribute = modalFilter?.eqAtribute || "";
    const atribute = modalFilter?.atribute || "";

    let url;

    if (buscarModalFilter) {
      url = `${PORT}/api/v1/membresias?perPage=${perPage}&page=${page}&order=${order}&orderBy=${orderBy}&eqAtribute=${eqAtribute}&atribute=${atribute}`;
    } else {
      url = `${PORT}/api/v1/membresias?perPage=10000&page=0`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText}`
      );
    }

    const consulta: ConsultaMembresia = await response.json();

    /* console.log("IMPRIMIENDO MEMBRESIAS EN CONSOLA");
    consulta.map((membresia) => {
      console.log(membresia);
    }); */

    /* console.log("IMPRIMIENDO CANTIDAD DE EMPLEADOS EN CONSOLA");
    console.log(consulta.count); */

    return consulta;

    /* return {
      data: consulta.data.map((consulta) => ({
        empleado: consulta.empleado,
        usuario: consulta.usuario,
      })),
      count: consulta.count,
    } */
  } catch (error) {
    console.error("Error en fetchSelectAllMembresias:", error);
    return {
      data: [],
      count: 0,
    };
    /* return { data: [], count: 0 }; */
  }
}
