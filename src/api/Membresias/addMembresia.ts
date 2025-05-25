import { PORT } from "../PORT";

export async function addMembresia({
  nombre,
  precio,
  duracion_meses,
  descripcion,
  tipo,
  setMensaje,
}: {
  nombre: string;
  precio: number;
  duracion_meses: number;
  descripcion: string;
  tipo: string;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    const agregarMembresia = await fetch(`${PORT}/api/v1/membresia`, {
      method: "POST",
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
    });

    setMensaje({ msj: "AGREGADO" });
    const responseMembresia = await agregarMembresia.json();

    return { ...responseMembresia };
  } catch (error) {
    console.error("Error en agregar membresía", error);
  }
}
