import Container from "../components/PageContainer/PageContainer";
import { CardGrid } from "../components/Card/CardGrid";
import { InfoUsers } from "../data/Card/InfoUsers";
import { Outlet, useLocation } from "react-router-dom";

export function UsuariosPage() {
  const location = useLocation();
  const path = InfoUsers.find(
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
            infoArray={InfoUsers}
            modalTitle=""
            modalBody
          />
        </div>
      )}
      <Outlet />
    </Container>
  );
}
