import { PORT } from "../PORT";

export async function updateEjercicio({
  ejercicio_id,
  nombre,
  descripcion,
  repeticiones,
  descanso,
  ejecucion,
  tempo,
  grupo_muscular,
  setMensaje,
}: {
  ejercicio_id: string;
  nombre: string;
  descripcion: string;
  repeticiones: string;
  descanso: number;
  ejecucion: string;
  tempo: string;
  grupo_muscular: string;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    const responseEjercicio = await fetch(
      `${PORT}/api/v1/ejercicio/${ejercicio_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          repeticiones,
          descanso,
          ejecucion,
          tempo,
          grupo_muscular,
        }),
      }
    );

    if (!responseEjercicio.ok) {
      const errorData = await responseEjercicio.json();
      console.error("❌ Error en la API:", errorData);
      alert("Error al actualizar el ejercicio");
      throw new Error(
        `Error ${responseEjercicio.status}: ${errorData.message}`
      );
    }

    const data = await responseEjercicio.json();
    setMensaje({ msj: "ACTUALIZADO" });

    return data;
  } catch (error) {
    console.error("⚠️ Error en updateEjercicio:", error);
    return {
      message: "errorUpdateEjercicio",
      error: error,
    };
  }
}
