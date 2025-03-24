import Container from "../../components/PageContainer/PageContainer";
import { CardGrid } from "../../components/Card/CardGrid";
import { infoEntrenamiento } from "../../data/Card/infoEntrenamiento";
import { Outlet, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export function EntrenamientoPage() {
  const location = useLocation();
  const path = infoEntrenamiento.find(
    (item) => "/training/" + item.link === location.pathname
  );
  const Component = (
    <div className="flex items-center gap-3">
      {path ? (
        <>
          <Link to={"/training"}>
            <h1 className="text-lg transition-all duration-200 md:text-xl lg:text-2xl hover:text-red-600">
              Entrenamiento
            </h1>
          </Link>
          <IoIosArrowForward className="text-xl text-red-600" />
          <Link to={"/training/" + path.link}>
            <h2 className="text-lg transition-all duration-200 md:text-xl lg:text-2xl hover:text-red-600">
              {path.nombre}
            </h2>
          </Link>
        </>
      ) : (
        <Link to={"/training"}>
          <h1 className="text-lg transition-all duration-200 md:text-xl lg:text-2xl hover:text-red-600">
            Entrenamiento
          </h1>
        </Link>
      )}
    </div>
  );

  return (
    <Container Title={Component}>
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
