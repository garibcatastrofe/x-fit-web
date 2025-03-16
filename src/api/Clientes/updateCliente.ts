import { PORT } from "../PORT";

export async function updateCliente({
  cliente_id,
  nombres,
  apellidos,
  genero,
  fecha_nacimiento,
  correo,
  password,
  telefono,
  estatus,
  tipo,
  usuario_id,
  setMensaje,
}: {
  cliente_id: number;
  nombres: string;
  apellidos: string;
  genero: string;
  fecha_nacimiento: string;
  correo: string;
  password: string;
  telefono: string;
  estatus: string;
  tipo: string;
  usuario_id: number;
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    fecha_nacimiento = fecha_nacimiento.slice(0, 10);
    console.log("📤 Enviando datos:", {
      cliente_id,
      nombres,
      apellidos,
      genero,
      fecha_nacimiento,
      correo,
      password,
      telefono,
      estatus,
      tipo,
      usuario_id,
    });

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
      alert("Error al actualizar el usuario del cliente");
      throw new Error(`Error ${responseUsuario.status}: ${errorData.message}`);
    }

    const responseCliente = await fetch(
      `${PORT}/api/v1/cliente/${cliente_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo,
          usuario_id,
        }),
      }
    );

    if (!responseCliente.ok) {
      const errorData = await responseCliente.json();
      console.error("❌ Error en la API:", errorData);
      alert("Error al actualizar el cliente");
      throw new Error(`Error ${responseCliente.status}: ${errorData.message}`);
    }

    const data = await responseCliente.json();
    setMensaje({ msj: "ACTUALIZADO" });

    return data;
  } catch (error) {
    console.error("⚠️ Error en updateCliente:", error);
    return {
      message: "errorUpdateCliente",
      error: error,
    };
  }
}
