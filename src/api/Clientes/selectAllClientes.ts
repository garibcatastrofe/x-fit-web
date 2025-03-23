import { useFilterModal } from "../../stores/ModalFilter/modalFilterStore";
import { PORT } from "../PORT";
import { ConsultaCliente } from "../../types/Clientes/ConsultaCliente";

export async function selectAllClientes({
  buscarSiguiente,
  busqueda,
  dato,
}: {
  buscarSiguiente: boolean;
  busqueda: number;
  dato: string;
}): Promise<ConsultaCliente> {
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

    if (busqueda === 0) {
      url = `${PORT}/api/v1/clientes?perPage=${perPage}&page=${page}&order=${order}&orderBy=${orderBy}&eqAtribute=${eqAtribute}&atribute=${atribute}`;
    } else {
      url = `${PORT}/api/v1/clientes?perPage=1&page=0&eqAtribute=usuario_id&atribute=${dato}`;
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

    const consulta: ConsultaCliente = await response.json();

    /* console.log("IMPRIMIENDO CLIENTES EN CONSOLA");
    consulta.data.map((consulta) => {
      console.log(consulta.cliente);
      console.log(consulta.usuario);
    });

    console.log("IMPRIMIENDO CANTIDAD DE CLIENTES EN CONSOLA");
    console.log(consulta.count); */

    return {
      data: consulta.data.map((consulta) => ({
        cliente: consulta.cliente,
        usuario: consulta.usuario,
      })),
      count: consulta.count,
    };
  } catch (error) {
    console.error("Error en fetchSelectAllClientes:", error);
    return { data: [], count: 0 };
  }
}
