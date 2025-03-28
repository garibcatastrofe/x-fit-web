import { useFilterModal } from "../../stores/ModalFilter/modalFilterStore";
import { PORT } from "../PORT";
import { ConsultaEjercicio } from "../../types/Ejercicios/ConsultaEjercicio";
import { Ejercicio } from "../../types/Ejercicios/Ejercicio";
import { EjercicioPrimitive } from "../../types/Ejercicios/EjercicioPrimitive";

export async function selectAllEjercicios({
  buscarSiguiente,
  docAnterior,
  docSiguiente,
}: {
  buscarSiguiente: boolean;
  docAnterior: EjercicioPrimitive | null;
  docSiguiente: EjercicioPrimitive | null;
}): Promise<ConsultaEjercicio> {
  try {
    const { modalFilter } = useFilterModal.getState();

    const perPage = modalFilter?.perPage || 5;
    const order = modalFilter?.order || "asc";
    const orderBy = modalFilter?.orderBy || "id";
    const direction = buscarSiguiente ? "next" : "prev";
    const eqAtribute = modalFilter?.eqAtribute || "";
    const atribute = modalFilter?.atribute || ""

    const nuevoDocAnterior: Ejercicio = {
      id: docAnterior?.ejercicio.id ?? "",
      nombre: docAnterior?.ejercicio.nombre ?? "",
      descripcion: docAnterior?.ejercicio.descripcion ?? "",
      repeticiones: docAnterior?.ejercicio.repeticiones ?? "",
      descanso: docAnterior?.ejercicio.descanso ?? 0,
      ejecucion: docAnterior?.ejercicio.ejecucion ?? "",
      tempo: docAnterior?.ejercicio.tempo ?? "",
      grupo_muscular: docAnterior?.ejercicio.grupo_muscular ?? "",
    };

    const nuevoDocSiguiente: Ejercicio = {
      id: docSiguiente?.ejercicio.id ?? "",
      nombre: docSiguiente?.ejercicio.nombre ?? "",
      descripcion: docSiguiente?.ejercicio.descripcion ?? "",
      repeticiones: docSiguiente?.ejercicio.repeticiones ?? "",
      descanso: docSiguiente?.ejercicio.descanso ?? 0,
      ejecucion: docSiguiente?.ejercicio.ejecucion ?? "",
      tempo: docSiguiente?.ejercicio.tempo ?? "",
      grupo_muscular: docSiguiente?.ejercicio.grupo_muscular ?? "",
    };

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
        body: JSON.stringify(
          direction === "next" ? nuevoDocSiguiente : nuevoDocAnterior
        ),
      };
    }

    const response = await fetch(
      `${PORT}/api/v1/ejercicios?perPage=${perPage}&order=${order}&orderBy=${orderBy}&direction=${direction}&eqAtribute=${eqAtribute}&atribute=${atribute}`,
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
