import { TableEmpleados } from "../../components/Table/TableEmpleados";

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