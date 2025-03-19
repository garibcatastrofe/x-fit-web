import { TableEmpleados } from "../../components/Table/Usuarios/TableEmpleados";

export function EmpleadosPage() {
  return (
    <TableEmpleados
      columns={[
        "ID",
        "Nombre",
        "Télefono",
        "Puesto",
        "Admin",
        "Estatus",
        "Editar",
        "Eliminar",
      ]}
    />
  );
}