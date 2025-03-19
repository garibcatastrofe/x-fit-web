import { TableClientes } from "../../components/Table/Usuarios/TableClientes";

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
