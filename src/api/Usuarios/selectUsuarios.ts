import { PORT } from "../PORT";

interface Consulta {
  data: Empleado[];
  count: number;
}

interface Empleado {
  empleado: EmpleadoPrimitive;
  periodo_vacacional: PeriodoVacacional;
  beneficiarios: Beneficiarios;
}

interface EmpleadoPrimitive {
  empleado_id: number;
  nombre: string;
  genero: string;
  fecha_ingreso: string;
}

interface PeriodoVacacional {
  periodo_vacacional_id: number;
  anio: number;
  dias_disponibles: number;
  dias_tomados: number;
  dias_pendientes: number;
  empleado_id: number;
}

interface Beneficiarios {
  id_beneficiario: number;
}

export async function fetchSelectAllUsuarios({
  buscarSiguiente,
  perPage,
  page,
  order,
  orderBy,
}: {
  buscarSiguiente: boolean;
  perPage: number;
  page: number;
  order: string;
  orderBy: string;
}) {
  try {
    const perPageFinal = perPage || 5;

    let pageFinal = page || 0;
    if (buscarSiguiente) {
      pageFinal = page != null ? page + 1 : 0;
    }

    const orderFinal = order || "asc";
    const orderByFinal = orderBy || "empleado_id";

    const url = `${PORT}/api/v1/usuarios?perPage=${perPageFinal}&page=${pageFinal}&order=${orderFinal}&orderBy=${orderByFinal}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText}`
      );
    }

    const data: Consulta = await response.json();

    console.log("IMPRIMIENDO EMPLEADOS EN CONSOLA");
    /* data.map((consulta: Consulta) => {
      console.log(consulta.count);
      console.log(consulta.data);
    }); */
    console.log(data.count);
    console.log(data.data);

    return data.data.map((emp: Empleado) => ({
      empleado_id: emp.empleado.empleado_id,
      nombre: emp.empleado.nombre,
      genero: emp.empleado.genero,
      fecha_ingreso: new Date(emp.empleado.fecha_ingreso).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Error en fetchSelectAll:", error);
    return [];
  }
}
