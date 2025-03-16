import Container from "../../components/PageContainer/PageContainer";
import { CardGrid } from "../../components/Card/CardGrid";
import { infoFinanzas } from "../../data/Card/infoFinanzas";
import { Outlet, useLocation } from "react-router-dom";

export function FinanzasPage() {
  const location = useLocation();
  const path = infoFinanzas.find(
    (item) => "/finance/" + item.link === location.pathname
  );
  const title = path ? "Finanzas - " + path?.nombre : "Finanzas";

  return (
    <Container title={title}>
      {location.pathname === "/finance" && (
        <div className="flex items-center justify-center w-full h-full">
          <CardGrid
            isLink={true}
            isBigLink={true}
            infoArray={infoFinanzas}
            modalTitle=""
            modalBody
          />
        </div>
      )}
      <Outlet />
    </Container>
  );
}
