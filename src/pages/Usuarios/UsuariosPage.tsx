import Container from "../../components/PageContainer/PageContainer";
import { CardGrid } from "../../components/Card/CardGrid";
import { infoUsuarios } from "../../data/Card/infoUsuarios";
import { Outlet, useLocation } from "react-router-dom";

export function UsuariosPage() {
  const location = useLocation();
  const path = infoUsuarios.find(
    (item) => "/users/" + item.link === location.pathname
  );
  const title = path ? "Usuarios - " + path?.nombre : "Usuarios";

  return (
    <Container title={title}>
      {location.pathname === "/users" && (
        <div className="flex items-center justify-center w-full h-full">
          <CardGrid
            isLink={true}
            isBigLink={true}
            infoArray={infoUsuarios}
            modalTitle=""
            modalBody
          />
        </div>
      )}
      <Outlet />
    </Container>
  );
}
