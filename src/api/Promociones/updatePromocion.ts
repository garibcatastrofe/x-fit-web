import { PORT } from "../PORT";

export async function updatePromocion({
  promocion_id,
  nombre,
  descuento,
  tipo_descuento,
  fecha_inicio,
  fecha_vencimiento,
  estatus,
  descripcion,
  setMensaje,
}: {
  promocion_id: number;
  nombre: string;
  descuento: number;
  tipo_descuento: string;
  fecha_inicio: string;
  fecha_vencimiento: string;
  estatus: string;
  descripcion: string;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    const responsePromocion = await fetch(
      `${PORT}/api/v1/promocion/${promocion_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          descuento,
          tipo_descuento,
          fecha_inicio,
          fecha_vencimiento,
          estatus,
          descripcion,
        }),
      }
    );

    if (!responsePromocion.ok) {
      const errorData = await responsePromocion.json();
      console.error("❌ Error en la API:", errorData);
      alert("Error al actualizar la promoción");
      throw new Error(
        `Error ${responsePromocion.status}: ${errorData.message}`
      );
    }

    const data = await responsePromocion.json();
    setMensaje({ msj: "ACTUALIZADO" });

    return data;
  } catch (error) {
    console.error("⚠️ Error en updatePromocion:", error);
    return {
      message: "errorUpdatePromocion",
      error: error,
    };
  }
}
