import { useFilterModal } from "../../stores/ModalFilter/modalFilterStore";
import { PORT } from "../PORT";
import { ConsultaEmpleado } from "../../types/Empleados/ConsultaEmpleado";

export async function selectAllEmpleados({
  buscarSiguiente,
}: {
  buscarSiguiente: boolean;
}): Promise<ConsultaEmpleado> {
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

    const url = `${PORT}/api/v1/empleados?perPage=${perPage}&page=${page}&order=${order}&orderBy=${orderBy}&eqAtribute=${eqAtribute}&atribute=${atribute}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText}`
      );
    }

    const consulta: ConsultaEmpleado = await response.json();

    console.log("IMPRIMIENDO EMPLEADOS EN CONSOLA");
    consulta.data.map((consulta) => {
      console.log(consulta.empleado);
      console.log(consulta.usuario);
    });

    console.log("IMPRIMIENDO CANTIDAD DE EMPLEADOS EN CONSOLA");
    console.log(consulta.count);

    return {
      data: consulta.data.map((consulta) => ({
        empleado: consulta.empleado,
        usuario: consulta.usuario,
      })),
      count: consulta.count,
    };
  } catch (error) {
    console.error("Error en fetchSelectAllEmpleados:", error);
    return { data: [], count: 0 };
  }
}
