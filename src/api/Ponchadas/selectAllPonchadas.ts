import { useFilterModal } from "../../stores/ModalFilter/modalFilterStore";
import { PORT } from "../PORT";
import { ConsultaPonchadasUsuarios } from "../../types/Ponchadas/ConsultaPonchadasUsuarios";

export async function selectAllPonchadas({
  buscarSiguiente,
}: {
  buscarSiguiente: boolean;
}): Promise<ConsultaPonchadasUsuarios> {
  try {
    const { modalFilter } = useFilterModal.getState();

    const perPage = modalFilter?.perPage || 10;

    let page = modalFilter?.page || 0;
    if (buscarSiguiente) {
      page = modalFilter?.page != null ? modalFilter.page + 1 : 0;
    }

    const order = modalFilter?.order || "desc";
    const orderBy = modalFilter?.orderBy || "id";
    const eqAtribute = modalFilter?.eqAtribute || "";
    const atribute = modalFilter?.atribute || "";

    const url = `${PORT}/api/v1/ponchadas?perPage=${perPage}&page=${page}&order=${order}&orderBy=${orderBy}&eqAtribute=${eqAtribute}&atribute=${atribute}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText}`
      );
    }

    const consulta: ConsultaPonchadasUsuarios = await response.json();

    return {
      data: consulta.data.map((consulta) => ({
        usuario: consulta.usuario,
        ponchada: consulta.ponchada,
      })),
      count: consulta.count,
    };
  } catch (error) {
    console.error("Error en fetchSelectAllPagos:", error);
    return { data: [], count: 0 };
  }
}
