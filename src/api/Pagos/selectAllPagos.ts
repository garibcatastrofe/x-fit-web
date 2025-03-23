import { useFilterModal } from "../../stores/ModalFilter/modalFilterStore";
import { PORT } from "../PORT";
import { ConsultaPago } from "../../types/Pagos/ConsultaPago";

export async function selectAllPagos({
  buscarSiguiente,
}: {
  buscarSiguiente: boolean;
}): Promise<ConsultaPago> {
  try {
    const { modalFilter } = useFilterModal.getState();

    const perPage = modalFilter?.perPage || 10;

    let page = modalFilter?.page || 0;
    if (buscarSiguiente) {
      page = modalFilter?.page != null ? modalFilter.page + 1 : 0;
    }

    const order = modalFilter?.order || "desc";
    const orderBy = modalFilter?.orderBy || "id";
    const eqAtribute = modalFilter?.eqAtribute || "";
    const atribute = modalFilter?.atribute || "";

    const url = `${PORT}/api/v1/pagos?perPage=${perPage}&page=${page}&order=${order}&orderBy=${orderBy}&eqAtribute=${eqAtribute}&atribute=${atribute}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText}`
      );
    }

    const consulta: ConsultaPago = await response.json();

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
        monto: consulta.monto,
        fecha_pago: consulta.fecha_pago,
        fecha_vencimiento: consulta.fecha_vencimiento,
        membresia_id: consulta.membresia_id,
        membresia_nombre: consulta.membresia_nombre,
        promocion_id: consulta.promocion_id,
        promocion_nombre: consulta.promocion_nombre,
        cliente_nombre: consulta.cliente_nombre,
      })),
      count: consulta.count,
    };
  } catch (error) {
    console.error("Error en fetchSelectAllPagos:", error);
    return { data: [], count: 0 };
  }
}
