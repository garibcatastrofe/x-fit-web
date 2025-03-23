import { PORT } from "../PORT";

export async function updateEmpleado({
  empleado_id,
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
  usuario_id,
  setMensaje,
}: {
  empleado_id: number;
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
  usuario_id: number;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    fecha_nacimiento = fecha_nacimiento.slice(0, 10);
    /* console.log("📤 Enviando datos:", {
      empleado_id,
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
      usuario_id,
    }); */

    const responseUsuario = await fetch(
      `${PORT}/api/v1/usuario/${usuario_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          password === ""
            ? {
                nombres,
                apellidos,
                genero,
                fecha_nacimiento,
                correo,
                telefono,
                estatus,
              }
            : {
                nombres,
                apellidos,
                genero,
                fecha_nacimiento,
                correo,
                password,
                telefono,
                estatus,
              }
        ),
      }
    );

    if (!responseUsuario.ok) {
      const errorData = await responseUsuario.json();
      console.error("❌ Error en la API:", errorData);
      alert("Error al actualizar el usuario del empleado");
      throw new Error(`Error ${responseUsuario.status}: ${errorData.message}`);
    }

    const responseEmpleado = await fetch(
      `${PORT}/api/v1/empleado/${empleado_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          puesto,
          is_admin,
          usuario_id,
        }),
      }
    );

    if (!responseEmpleado.ok) {
      const errorData = await responseEmpleado.json();
      console.error("❌ Error en la API:", errorData);
      alert("Error al actualizar el empleado");
      throw new Error(`Error ${responseEmpleado.status}: ${errorData.message}`);
    }

    const data = await responseEmpleado.json();
    setMensaje({ msj: "ACTUALIZADO" });

    return data;
  } catch (error) {
    console.error("⚠️ Error en updateEmpleado:", error);
    return {
      message: "errorUpdateEmpleado",
      error: error,
    };
  }
}
