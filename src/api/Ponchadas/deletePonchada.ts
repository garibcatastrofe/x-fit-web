import { PORT } from "../PORT";

export async function deletePonchada({
  id,
  setMensaje,
}: {
  id: number;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    /* console.log("🗑️ Eliminando pago con ID:", id); */

    const response = await fetch(`${PORT}/api/v1/ponchada/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      /* console.error("❌ Error en la API:", errorData); */
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    /* console.log("✅ Pago eliminado correctamente"); */
    setMensaje({ msj: "ELIMINADO" });

    return { success: true };
  } catch (error) {
    console.error("⚠️ Error en deletePago:", error);
  }
}
