import { TablePromociones } from "../../components/Table/Finanzas/TablePromociones";

export function PromocionesPage() {
  return (
    <TablePromociones
      columns={[
        "Nombre",
        "Descuento",
        "Tipo Descuento",
        "Estatus",
        "Editar",
        "Eliminar",
      ]}
    />
  );
}
