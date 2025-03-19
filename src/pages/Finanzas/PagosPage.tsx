import { TablePagos } from "../../components/Table/Finanzas/TablePagos";

export function PagosPage() {
  return (
    <TablePagos
      columns={[
        "ID",
        "Monto",
        "Pagado",
        "Vencimiento",
        "Membresia",
        "Promoción",
        "Asignado",
        "Ver",
        "Eliminar",
      ]}
    />
  );
}