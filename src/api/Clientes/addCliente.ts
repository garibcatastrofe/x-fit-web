import { PORT } from "../PORT";

export async function addCliente({
  nombres,
  apellidos,
  genero,
  fecha_nacimiento,
  correo,
  password,
  telefono,
  estatus,
  tipo,
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
  tipo: string;
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

      const fechaActual = new Date();
      const fecha_inicio = `${fechaActual.getFullYear()}-${String(
        fechaActual.getMonth() + 1
      ).padStart(2, "0")}-${String(fechaActual.getDate()).padStart(2, "0")}`;

      const agregarCliente = await fetch(`${PORT}/api/v1/cliente`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha_inicio,
          tipo,
          usuario_id,
        }),
      });
      setMensaje({ msj: "AGREGADO" });
      const responseCliente = await agregarCliente.json();

      return { ...responseCliente };
    }

    if (
      responseUsuario.details.message === "Ya existe un usuario con ese correo"
    ) {
      return responseUsuario.details.message;
    }
  } catch (error) {
    console.error("Error en agregar cliente", error);
  }
}
