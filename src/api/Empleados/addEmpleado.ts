import { PORT } from "../PORT";

export async function addEmpleado({
  nombres,
  apellidos,
  genero,
  fecha_nacimiento,
  correo,
  password,
  telefono,
  estatus,
  puesto,
  is_admin,
  setMensaje,
}: {
  nombres: string;
  apellidos: string;
  genero: string;
  fecha_nacimiento: string;
  correo: string;
  password: string;
  telefono: string;
  estatus: string;
  puesto: string;
  is_admin: string;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    const agregarUsuario = await fetch(`${PORT}/api/v1/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombres,
        apellidos,
        genero,
        fecha_nacimiento,
        correo,
        password,
        telefono,
        estatus,
      }),
    });
    const responseUsuario = await agregarUsuario.json();
    if (responseUsuario.details?.message === undefined) {
      /* console.log("USUARIO AGREGADO: ", responseUsuario); */
      const usuario_id = responseUsuario.id;

      const agregarEmpleado = await fetch(`${PORT}/api/v1/empleado`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          puesto,
          is_admin,
          usuario_id,
        }),
      });
      setMensaje({ msj: "AGREGADO" });
      const responseEmpleado = await agregarEmpleado.json();

      return { ...responseEmpleado };
    }

    if (
      responseUsuario.details.message === "Ya existe un usuario con ese correo"
    ) {
      return responseUsuario.details.message;
    }
  } catch (error) {
    console.error("Error en agregar empleado", error);
  }
}
