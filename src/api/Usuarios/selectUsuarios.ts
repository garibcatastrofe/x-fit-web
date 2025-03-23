import { useFilterModal } from "../../../src/stores/ModalFilter/modalFilterStore";
import { PORT } from "../PORT";
import { Cliente } from "../../types/Clientes/Cliente";

interface Consulta {
  data: Cliente[];
}

export async function fetchSelectAll({
  buscarSiguiente,
}: {
  buscarSiguiente: boolean;
}) {
  try {
    const { modalFilter } = useFilterModal.getState();

    const perPage = modalFilter?.perPage || 5;

    let page = modalFilter?.page || 0;
    if (buscarSiguiente) {
      page = modalFilter?.page != null ? modalFilter.page + 1 : 0;
    }

    const order = modalFilter?.order || "asc";
    const orderBy = modalFilter?.orderBy || "cliente_id";
    const eqAtribute = modalFilter?.eqAtribute || "id";
    const atribute = modalFilter?.atribute || "0";

    const url = `${PORT}/api/v1/clientes?perPage=${perPage}&page=${page}&order=${order}&orderBy=${orderBy}&eqAtribute=${eqAtribute}&atribute=${atribute}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText}`
      );
    }

    const data: Consulta = await response.json();

    /* console.log("IMPRIMIENDO CLIENTES EN CONSOLA");
    data.data.map((cliente: Cliente) => {
      console.log(cliente);
    }); */

    return data.data.map((cliente: Cliente) => ({
      cliente_id: cliente.id,
      fecha_inicio: cliente.fecha_inicio,
      tipo: cliente.tipo,
      usuario_id: cliente.usuario_id,
    }));
  } catch (error) {
    console.error("Error en fetchSelectAllClientes:", error);
    return [];
  }
}
