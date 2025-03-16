import { TableClientes } from "../components/Table/TableClientes";

export function ClientesPage() {
  return (
    <TableClientes
      columns={[
        "ID",
        "Nombre",
        "Télefono",
        "Fecha Inicio",
        "Tipo",
        "Estatus",
        "Editar",
        "Eliminar",
      ]}
    />
  );
}
