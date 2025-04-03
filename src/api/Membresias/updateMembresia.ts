import { PORT } from "../PORT";

export async function updateMembresia({
  membresia_id,
  nombre,
  precio,
  duracion_meses,
  descripcion,
  tipo,
  setMensaje,
}: {
  membresia_id: number;
  nombre: string;
  precio: number;
  duracion_meses: number;
  descripcion: string;
  tipo: string;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    const responseMembresia = await fetch(
      `${PORT}/api/v1/membresia/${membresia_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          precio,
          duracion_meses,
          descripcion,
          tipo,
        }),
      }
    );

    if (!responseMembresia.ok) {
      const errorData = await responseMembresia.json();
      console.error("❌ Error en la API:", errorData);
      alert("Error al actualizar la membresia");
      throw new Error(
        `Error ${responseMembresia.status}: ${errorData.message}`
      );
    }

    const data = await responseMembresia.json();
    setMensaje({ msj: "ACTUALIZADO" });

    return data;
  } catch (error) {
    console.error("⚠️ Error en updateCliente:", error);
    return {
      message: "errorUpdateCliente",
      error: error,
    };
  }
}
