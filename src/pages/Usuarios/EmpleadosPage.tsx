import { TableEmpleados } from "../../components/Table/Usuarios/TableEmpleados";

export function EmpleadosPage() {
  return (
    <TableEmpleados
      columns={[
        "Estatus",
        "Nombre",
        "Télefono",
        "Puesto",
        "Admin",
        "QR",
        "Editar",
        "Eliminar",
      ]}
    />
  );
}