import { PORT } from "../PORT";

export async function deleteEjercicio({
  id,
  setMensaje,
}: {
  id: string;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    const response = await fetch(`${PORT}/api/v1/ejercicio/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Error en la API:", errorData);
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    setMensaje({ msj: "ELIMINADO" });

    return { success: true };
  } catch (error) {
    console.error("⚠️ Error en deleteEjercicio:", error);
  }
}
