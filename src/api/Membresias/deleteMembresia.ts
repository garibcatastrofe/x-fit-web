import { PORT } from "../PORT";

export async function deleteMembresia({
  id,
  setMensaje,
}: {
  id: number;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    /* console.log("🗑️ Eliminando usuario de cliente con ID:", id); */

    const response = await fetch(`${PORT}/api/v1/membresia/${id}`, {
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

    /* console.log("✅ Usuario de cliente eliminado correctamente"); */
    setMensaje({ msj: "ELIMINADO" });

    return { success: true };
  } catch (error) {
    console.error("⚠️ Error en deleteCliente:", error);
  }
}
