import { PORT } from "../PORT";
import { ConsultaPagosClientes } from "../../types/Pagos/ConsultaPagosClientes";

export async function selectAllPagosClientes({
  pago_id,
}: {
  pago_id: number;
}): Promise<ConsultaPagosClientes> {
  try {
    const url = `${PORT}/api/v1/pagos-clientes?perPage=1000&page=0&eqAtribute=pago_id&atribute=${pago_id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText}`
      );
    }

    const consulta: ConsultaPagosClientes = await response.json();

    //console.log(consulta.data)

    /* console.log("IMPRIMIENDO PAGOS EN CONSOLA");
    consulta.data.map((consulta) => {
      console.log(consulta);
    });

    console.log("IMPRIMIENDO CANTIDAD DE PAGOS EN CONSOLA");
    console.log(consulta.count); */

    return {
      data: consulta.data.map((consulta) => ({
        id: consulta.id,
        pago_id: consulta.pago_id,
        cliente_id: consulta.cliente_id,
        usuario_id: consulta.cliente_id,
        nombres: consulta.nombres,
        apellidos: consulta.apellidos,
      })),
      count: consulta.count,
    };
  } catch (error) {
    console.error("Error en fetchSelectAllPagosClientes:", error);
    return { data: [], count: 0 };
  }
}
