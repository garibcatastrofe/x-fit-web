import Container from "../../components/PageContainer/PageContainer";
import { CardGrid } from "../../components/Card/CardGrid";
import { infoEntrenamiento } from "../../data/Card/infoEntrenamiento";
import { Outlet, useLocation } from "react-router-dom";

export function EntrenamientoPage() {
  const location = useLocation();
  const path = infoEntrenamiento.find(
    (item) => "/training/" + item.link === location.pathname
  );
  const title = path ? "Entrenamiento - " + path?.nombre : "Entrenamiento";

  return (
    <Container title={title}>
      {location.pathname === "/training" && (
        <div className="flex items-center justify-center w-full h-full">
          <CardGrid
            isLink={true}
            isBigLink={true}
            infoArray={infoEntrenamiento}
            modalTitle=""
            modalBody
          />
        </div>
      )}
      <Outlet />
    </Container>
  );
}
