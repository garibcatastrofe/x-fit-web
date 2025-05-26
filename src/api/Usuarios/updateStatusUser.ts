import { PORT } from "../PORT";

export async function updateStatusCliente({
  id,
  estatus,
  setMensaje,
}: {
  id: number;
  estatus: string;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    const responseUsuario = await fetch(
      `${PORT}/api/v1/usuario/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estatus,
        }),
      }
    );

    if (!responseUsuario.ok) {
      const errorData = await responseUsuario.json();
      console.error("❌ Error en la API:", errorData);
      alert("Error al actualizar el estatus del usuario");
      throw new Error(`Error ${responseUsuario.status}: ${errorData.message}`);
    }

    const data = await responseUsuario.json();
    setMensaje({ msj: "ACTUALIZADO" });

    return data;
  } catch (error) {
    console.error("⚠️ Error en updateState:", error);
    return {
      message: "errorUpdateState",
      error: error,
    };
  }
}
