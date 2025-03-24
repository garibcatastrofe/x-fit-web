import { PORT } from "../PORT";

export async function updatePonchada({
  ponchada_id,
  fecha,
  usuario_id,
  setMensaje,
}: {
  ponchada_id: number;
  fecha: string;
  usuario_id: number;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    fecha = fecha.slice(0, 10);

    const responsePonchada = await fetch(
      `${PORT}/api/v1/ponchada/${ponchada_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha,
          usuario_id,
        }),
      }
    );

    if (!responsePonchada.ok) {
      const errorData = await responsePonchada.json();
      console.error("❌ Error en la API:", errorData);
      alert("Error al actualizar la ponchada del usuario");
      throw new Error(`Error ${responsePonchada.status}: ${errorData.message}`);
    }

    const data = await responsePonchada.json();
    setMensaje({ msj: "ACTUALIZADO" });

    return data;
  } catch (error) {
    console.error("⚠️ Error en updatePonchada:", error);
    return {
      message: "errorUpdatePonchada",
      error: error,
    };
  }
}
