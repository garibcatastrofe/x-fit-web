import { useFilterModal } from "../../stores/ModalFilter/modalFilterStore";
import { PORT } from "../PORT";
import { ConsultaEjercicio } from "../../types/Ejercicios/ConsultaEjercicio";
import { Ejercicio } from "../../types/Ejercicios/Ejercicio";

export async function selectAllEjercicios({
  buscarSiguiente,
  docAnterior,
  docSiguiente,
}: {
  buscarSiguiente: boolean;
  docAnterior: Ejercicio | null;
  docSiguiente: Ejercicio | null;
}): Promise<ConsultaEjercicio> {
  try {
    const { modalFilter } = useFilterModal.getState();

    const perPage = modalFilter?.perPage || 5;
    const order = modalFilter?.order || "asc";
    const orderBy = modalFilter?.orderBy || "id";
    const direction = buscarSiguiente ? "next" : "prev";

    let bodyFetch;

    if (docAnterior === null && docSiguiente === null) {
      bodyFetch = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
    } else {
      bodyFetch = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(direction === "next" ? docSiguiente : docAnterior),
      };
    }

    const response = await fetch(
      `${PORT}/api/v1/ejercicios?perPage=${perPage}&order=${order}&orderBy=${orderBy}&direction=${direction}`,
      bodyFetch
    );

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText}`
      );
    }

    const consulta: ConsultaEjercicio = await response.json();

    return {
      data: consulta.data.map((consulta) => consulta),
      count: consulta.count,
    };
  } catch (error) {
    console.error("Error en fetchSelectAllEjercicios:", error);
    return { data: [], count: 0 };
  }
}
