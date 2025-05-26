import { TableClientes } from "../../components/Table/Usuarios/TableClientes";

export function ClientesPage() {
  return (
    <TableClientes
      columns={[
        "Estatus",
        "Nombre",
        "Télefono",
        "Fecha Inicio",
        "Tipo",
        "QR",
        "Editar",
        "Eliminar",
      ]}
    />
  );
}
