import { PORT } from "../PORT";
import { Promocion } from "../../types/Promociones/Promocion";

export async function selectPromocionById(id: number): Promise<Promocion> {
  try {
    const response = await fetch(`${PORT}/api/v1/promocion/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      //const errorText = response.body;
      //console.log("Not found en GetById", errorText);
      return {
        id: 0,
        descuento: 0,
        estatus: "",
        fecha_inicio: "",
        fecha_vencimiento: "",
        nombre: "",
        tipo_descuento: "",
      };
    }

    const data: Promocion = await response.json();
    return { ...data };
  } catch (error) {
    console.log("Error en GetById", error);
    return {
      id: 0,
      descuento: 0,
      estatus: "",
      fecha_inicio: "",
      fecha_vencimiento: "",
      nombre: "",
      tipo_descuento: "",
    };
  }
}
