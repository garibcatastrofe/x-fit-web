import { PORT } from "../PORT";
import { Membresia } from "../../types/Membresias/Membresia";

export async function selectMembresiaById(id: number): Promise<Membresia> {
  try {
    const response = await fetch(`${PORT}/api/v1/membresia/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = response.body;
      console.log("Not found en GetById", errorText);
      return {
        id: 0,
        descripcion: "",
        duracion_meses: 0,
        nombre: "",
        precio: 0,
        tipo: "",
      };
    }

    const data: Membresia = await response.json();
    return { ...data };
  } catch (error) {
    console.log("Error en GetById", error);
    return {
      id: 0,
      descripcion: "",
      duracion_meses: 0,
      nombre: "",
      precio: 0,
      tipo: "",
    };
  }
}
