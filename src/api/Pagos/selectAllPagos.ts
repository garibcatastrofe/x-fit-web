import {
  useFilterModal,
  ModalFilterData,
} from "../../stores/ModalFilter/modalFilterStore";
import { PORT } from "../PORT";
import { ConsultaPago } from "../../types/Pagos/ConsultaPago";

export async function selectAllPagos({
  needData,
  buscarSiguiente,
}: {
  needData: { buscarDesdeModal: boolean; data: ModalFilterData | null };
  buscarSiguiente: boolean;
}): Promise<ConsultaPago> {
  try {
    const { modalFilter } = useFilterModal.getState();

    let page;
    let perPage;
    let order;
    let orderBy;
    let checkFilters;
    let filters;

    if (needData.buscarDesdeModal) {
      perPage = modalFilter?.perPage || 10;

      page = modalFilter?.page || 1;
      if (buscarSiguiente) {
        page = modalFilter?.page != null ? modalFilter.page + 1 : 0;
      }

      order = modalFilter?.order || "asc";
      orderBy = modalFilter?.orderBy || "id";
      checkFilters = modalFilter?.checkFilters || false;
      filters = modalFilter?.filters || [];
    } else {
      perPage = needData.data?.perPage || 100000;
      page = needData.data?.page || 1;
      order = needData.data?.order || "asc";
      orderBy = needData.data?.orderBy || "id";
      checkFilters = needData.data?.checkFilters || false;
      filters = needData.data?.filters || [];
    }

    const response = await fetch(`${PORT}/api/v1/pagos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page,
        perPage,
        order,
        orderBy,
        checkFilters,
        filters,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText}`
      );
    }

    const consulta: ConsultaPago = await response.json();

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
