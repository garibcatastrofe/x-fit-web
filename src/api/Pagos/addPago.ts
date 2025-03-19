import { PORT } from "../PORT";
import { selectMembresiaById } from "../Membresias/selectMembresiaById";
import { selectAllClientes } from "../Clientes/selectAllClientes";

export async function addPago({
  monto,
  membresia_id,
  promocion_id,
  clientes,
  setMensaje,
}: {
  monto: number;
  membresia_id: number;
  promocion_id: number;
  clientes: number[];
  setMensaje: (data: { msj: string }) => void;
}) {
  try {
    const fechaActual = new Date();
    const fecha_pago = `${fechaActual.getFullYear()}-${String(
      fechaActual.getMonth() + 1
    ).padStart(2, "0")}-${String(fechaActual.getDate()).padStart(2, "0")}`;

    const membresia = await selectMembresiaById(membresia_id);
    const meses = membresia.duracion_meses;

    // Crear objeto Date a partir de fecha_pago
    const fechaVencimientoObj = new Date(fechaActual);
    fechaVencimientoObj.setMonth(fechaVencimientoObj.getMonth() + meses);

    // Formatear la fecha de vencimiento en "YYYY-MM-DD"
    const fecha_vencimiento = `${fechaVencimientoObj.getFullYear()}-${String(
      fechaVencimientoObj.getMonth() + 1
    ).padStart(2, "0")}-${String(fechaVencimientoObj.getDate()).padStart(
      2,
      "0"
    )}`;

    console.log("Fecha de pago:", fecha_pago);
    console.log("Fecha de vencimiento:", fecha_vencimiento);

    const clientesVerificados: number[] = []; // ✅ Inicializar el array

    for (const usuario_id of clientes) {
      // ✅ Usar for...of para await
      try {
        const buscarCliente = await selectAllClientes({
          buscarSiguiente: false,
          busqueda: 1,
          dato: usuario_id.toString(),
        });

        if (buscarCliente.count === 0) {
          console.log("Error al agregar el cliente");
          alert(
            `Error al agregar al cliente con id_usuario, verifique su ID e intente nuevamente: ${usuario_id}`
          );
          return;
        }

        clientesVerificados.push(buscarCliente.data[0].cliente.id);
      } catch (error) {
        console.error("Error al buscar cliente:", error);
      }
    }

    const agregarPago = await fetch(`${PORT}/api/v1/pago`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        monto,
        fecha_pago,
        fecha_vencimiento,
        membresia_id,
        promocion_id,
      }),
    });

    const responsePago = await agregarPago.json();
    console.log("PAGO AGREGADO: ", responsePago);
    const pago_id = responsePago.id;

    clientesVerificados.map(async (cliente_id) => {
      const agregarPagoCliente = await fetch(`${PORT}/api/v1/pago-cliente`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente_id,
          pago_id,
        }),
      });

      const responsePagoCliente = await agregarPagoCliente.json();
      console.log(
        `CLIENTE ${cliente_id} DEL PAGO ${pago_id} AGREGADO CORRECTAMENTE...`,
        responsePagoCliente
      );
    });

    setMensaje({ msj: "AGREGADO" });
    return { ...responsePago };
  } catch (error) {
    console.error("Error en agregar pago", error);
  }
}
