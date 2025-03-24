import Container from "../../components/PageContainer/PageContainer";
import { CardGrid } from "../../components/Card/CardGrid";
import { infoPonchadas } from "../../data/Card/infoPonchadas";
import { Outlet, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export function PonchadasPage() {
  const location = useLocation();
  const path = infoPonchadas.find(
    (item) => "/clockIn/" + item.link === location.pathname
  );
  const Component = (
    <div className="flex items-center gap-3">
      {path ? (
        <>
          <Link to={"/clockIn"}>
            <h1 className="text-lg transition-all duration-200 md:text-xl lg:text-2xl hover:text-red-600">
              Ponchadas
            </h1>
          </Link>
          <IoIosArrowForward className="text-xl text-red-600" />
          <Link to={"/clockIn/" + path.link}>
            <h2 className="text-lg transition-all duration-200 md:text-xl lg:text-2xl hover:text-red-600">
              {path.nombre}
            </h2>
          </Link>
        </>
      ) : (
        <Link to={"/clockIn"}>
          <h1 className="text-lg transition-all duration-200 md:text-xl lg:text-2xl hover:text-red-600">
            Ponchadas
          </h1>
        </Link>
      )}
    </div>
  );

  return (
    <Container Title={Component}>
      {location.pathname === "/clockIn" && (
        <div className="flex items-center justify-center w-full h-full">
          <CardGrid
            isLink={true}
            isBigLink={true}
            infoArray={infoPonchadas}
            modalTitle=""
            modalBody
          />
        </div>
      )}
      <Outlet />
    </Container>
  );
}
