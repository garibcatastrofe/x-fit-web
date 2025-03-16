export function formatearFecha(date: string) {
  const partes = date.split("-");
  const fechaFormateada = `${partes[2]}-${partes[1]}-${partes[0]}`;
  return fechaFormateada;
}
