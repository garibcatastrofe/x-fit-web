import { PORT } from "../PORT";

export async function addEjercicio({
  nombre,
  descripcion,
  repeticiones,
  descanso,
  ejecucion,
  tempo,
  grupo_muscular,
  setMensaje,
}: {
  nombre: string;
  descripcion: string;
  repeticiones: string;
  descanso: number;
  ejecucion: string;
  tempo: string;
  grupo_muscular: string;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    descanso = Number(descanso)
    
    const agregarEjercicio = await fetch(`${PORT}/api/v1/ejercicio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        repeticiones,
        descanso,
        ejecucion,
        tempo,
        grupo_muscular,
      }),
    });

    const responseEjercicio = await agregarEjercicio.json();
    setMensaje({ msj: "AGREGADO" });

    return { ...responseEjercicio };
  } catch (error) {
    console.error("Error en agregar cliente", error);
  }
}
