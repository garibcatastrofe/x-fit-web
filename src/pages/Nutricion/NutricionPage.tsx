import Container from "../../components/PageContainer/PageContainer";
import { CardGrid } from "../../components/Card/CardGrid";
import { infoNutricion } from "../../data/Card/infoNutricion";
import { Outlet, useLocation } from "react-router-dom";

export function NutricionPage() {
  const location = useLocation();
  const path = infoNutricion.find(
    (item) => "/nutrition/" + item.link === location.pathname
  );
  const title = path ? "Nutrición - " + path?.nombre : "Nutrición";

  return (
    <Container title={title}>
      {location.pathname === "/nutrition" && (
        <div className="flex items-center justify-center w-full h-full">
          <CardGrid
            isLink={true}
            isBigLink={true}
            infoArray={infoNutricion}
            modalTitle=""
            modalBody
          />
        </div>
      )}
      <Outlet />
    </Container>
  );
}
