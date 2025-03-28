import { TableEjercicios } from "../../components/Table/Entrenamiento/TableEjercicios";

export function EjerciciosPage() {
  return (
    <TableEjercicios
      columns={[
        "Nombre",
        "Grupo Muscular",
        "Repeticiones",
        "Descanso",
        "Vídeo",
        "Editar",
        "Eliminar",
      ]}
    />
  );
}
