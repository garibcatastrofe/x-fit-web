import { TableMembresias } from "../../components/Table/Finanzas/TableMembresias";

export function MembresiasPage() {
  return (
    <TableMembresias
      columns={[
        "Nombre",
        "Precio",
        "Duración (Meses)",
        "Tipo",
        "Editar",
        "Eliminar",
      ]}
    />
  );
}
