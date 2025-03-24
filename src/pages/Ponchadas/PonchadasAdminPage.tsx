import { TablePonchadas } from "../../components/Table/Ponchadas/TablePonchadas";

export function PonchadasAdminPage() {
  return (
    <TablePonchadas
      columns={["ID", "Fecha", "Usuario", "Eliminar"]}
    />
  );
}
