import Container from "../../components/PageContainer/PageContainer";
import { CardGrid } from "../../components/Card/CardGrid";
import { infoFormatos } from "../../data/Card/infoFormatos";
import { Outlet, useLocation } from "react-router-dom";

export function FormatosPage() {
  const location = useLocation();
  const path = infoFormatos.find(
    (item) => "/formats/" + item.link === location.pathname
  );
  const title = path ? "Formatos - " + path?.nombre : "Formatos";

  return (
    <Container title={title}>
      {location.pathname === "/formats" && (
        <div className="flex items-center justify-center w-full h-full">
          <CardGrid
            isLink={true}
            isBigLink={true}
            infoArray={infoFormatos}
            modalTitle=""
            modalBody
          />
        </div>
      )}
      <Outlet />
    </Container>
  );
}
