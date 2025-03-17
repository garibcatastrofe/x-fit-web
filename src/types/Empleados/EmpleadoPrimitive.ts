import { EmpleadoType } from "./EmpleadoType";
import { Usuario } from "../Usuarios/Usuario";

export interface EmpleadoPrimitive {
  empleado: EmpleadoType;
  usuario: Usuario;
}
