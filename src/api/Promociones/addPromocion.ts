import { PORT } from "../PORT";

export async function addPromocion({
  nombre,
  descuento,
  tipo_descuento,
  fecha_inicio,
  fecha_vencimiento,
  estatus,
  descripcion,
  setMensaje,
}: {
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
    const agregarPromocion = await fetch(`${PORT}/api/v1/promocion`, {
      method: "POST",
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
    });

    setMensaje({ msj: "AGREGADO" });
    const responsePromocion = await agregarPromocion.json();

    return { ...responsePromocion };
  } catch (error) {
    console.error("Error en agregar promoción", error);
  }
}
