import { PORT } from "../PORT";

export async function addPonchada({
  fec,
  usuario_id,
}: {
  fec: Date;
  usuario_id: number;
}) {
  try {
    const anio = fec.getFullYear();
    const mes = String(fec.getMonth() + 1).padStart(2, "0"); // Mes en JavaScript es 0-indexado
    const dia = String(fec.getDate()).padStart(2, "0");
    const horas = String(fec.getHours()).padStart(2, "0");
    const minutos = String(fec.getMinutes()).padStart(2, "0");
    const segundos = String(fec.getSeconds()).padStart(2, "0");
    const fechaFormateada = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

    const fecha = fechaFormateada;

    const agregarPonchada = await fetch(`${PORT}/api/v1/ponchada`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha,
        usuario_id,
      }),
    });
    const responsePonchada = await agregarPonchada.json();
    return { ...responsePonchada };
  } catch (error) {
    console.error("Error en agregar la ponchada", error);
  }
}
