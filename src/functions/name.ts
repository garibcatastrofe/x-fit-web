export const getInitials = (nombres: string, apellidos: string): string => {
  const primeraLetraNombre = nombres ? nombres.split(" ")[0][0] : "";
  const primeraLetraApellido = apellidos ? apellidos.split(" ")[0][0] : "";
  return primeraLetraNombre + primeraLetraApellido;
};

export const getShortName = (nombres: string, apellidos: string): string => {
  const primerNombre = nombres.split(" ")[0];
  const primerApellido = apellidos ? apellidos.split(" ")[0] : "";
  return primerNombre + " " + primerApellido;
};
