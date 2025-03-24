import Container from "../../components/PageContainer/PageContainer";
import { CardGrid } from "../../components/Card/CardGrid";
import { infoNutricion } from "../../data/Card/infoNutricion";
import { Outlet, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export function NutricionPage() {
  const location = useLocation();
  const path = infoNutricion.find(
    (item) => "/nutrition/" + item.link === location.pathname
  );
  const Component = (
    <div className="flex items-center gap-3">
      {path ? (
        <>
          <Link to={"/nutrition"}>
            <h1 className="text-lg transition-all duration-200 md:text-xl lg:text-2xl hover:text-red-600">
              Nutrición
            </h1>
          </Link>
          <IoIosArrowForward className="text-xl text-red-600" />
          <Link to={"/nutrition/" + path.link}>
            <h2 className="text-lg transition-all duration-200 md:text-xl lg:text-2xl hover:text-red-600">
              {path.nombre}
            </h2>
          </Link>
        </>
      ) : (
        <Link to={"/nutrition"}>
          <h1 className="text-lg transition-all duration-200 md:text-xl lg:text-2xl hover:text-red-600">
            Nutrición
          </h1>
        </Link>
      )}
    </div>
  );

  return (
    <Container Title={Component}>
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
