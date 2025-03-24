export function formatearFecha(date: string) {
  const partes = date.split("-");
  const fechaFormateada = `${partes[2]}/${partes[1]}/${partes[0]}`;
  return fechaFormateada;
}

export function formatDateTimeManual(dateTimeString: string) {
  const [datePart, timePart] = dateTimeString.split(" ");
  const [year, month, day] = datePart.split("-");
  return `${day}/${month}/${year.slice(-2)} ${timePart}`;
}
