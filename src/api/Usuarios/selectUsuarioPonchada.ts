import { PORT } from "../PORT";
import { Cliente } from "../../types/Clientes/Cliente";
import { EmpleadoType } from "../../types/Empleados/EmpleadoType";
import { Usuario } from "../../types/Usuarios/Usuario";

export interface UsuarioWithRelations {
  usuario: Usuario;
  cliente: Cliente | null;
  empleado: EmpleadoType | null;
}

interface DataPrincipal {
  data: UsuarioWithRelations[];
  countUsuarios: number;
  countEmpleados: number;
  countClientes: number;
}

export async function fetchSelectAll({ id }: { id: number }) {
  try {
    const url = `${PORT}/api/v1/usuarios?perPage=1&page=0&order=desc&orderBy=id&eqAtribute=id&atribute=${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la API: ${response.status} ${response.statusText}`
      );
    }

    const data: DataPrincipal = await response.json();

    return data;
  } catch (error) {
    console.error("Error en fetchSelectAllClientes:", error);
    const err: DataPrincipal = {
      data: [],
      countClientes: 0,
      countEmpleados: 0,
      countUsuarios: 0
    }
    return err;
  }
}
