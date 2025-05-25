import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

/* SIDEBAR */
import { SidebarItem, SideBar } from "../components/Sidebar/SideBar";
import { BiHomeAlt2 } from "react-icons/bi";
import { LuUsersRound } from "react-icons/lu";
import { IoIosFitness } from "react-icons/io";
import { IoRestaurantOutline } from "react-icons/io5";
import { RiSurveyLine } from "react-icons/ri";
import { MdLockClock } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

/* PAGES */

/* GENERAL */
import { LoginPage } from "../pages/LoginPage";
import { InicioPage } from "../pages/InicioPage";
import { NotFoundPage } from "../pages/NotFoundPage";

/* USUARIOS */
import { UsuariosPage } from "../pages/Usuarios/UsuariosPage";
import { ClientesPage } from "../pages/Usuarios/ClientesPage";
import { EmpleadosPage } from "../pages/Usuarios/EmpleadosPage";

/* PONCHADAS */
import { PonchadasPage } from "../pages/Ponchadas/PonchadasPage";
import { PonchadasAdminPage } from "../pages/Ponchadas/PonchadasAdminPage";
import { PonchadasPoncharPage } from "../pages/Ponchadas/PonchadasPoncharPage";

/* FINANZAS */
import { FinanzasPage } from "../pages/Finanzas/FinanzasPage";
import { PagosPage } from "../pages/Finanzas/PagosPage";
import { MembresiasPage } from "../pages/Finanzas/MembresiasPage";
import { PromocionesPage } from "../pages/Finanzas/PromocionesPage";

/* NUTRICIÓN */
import { NutricionPage } from "../pages/Nutricion/NutricionPage";
import { DietasPage } from "../pages/Nutricion/DietasPage";
import { AlimentosPage } from "../pages/Nutricion/AlimentosPage";

/* ENTRENAMIENTO */
import { EntrenamientoPage } from "../pages/Entrenamiento/EntrenamientoPage";
import { EjerciciosPage } from "../pages/Entrenamiento/EjerciciosPage";
import { ReportesPage } from "../pages/Entrenamiento/ReportesPage";
import { RutinasPage } from "../pages/Entrenamiento/RutinasPage";

/* REPORTES */
import { FormatosPage } from "../pages/Formatos/FormatosPage";
import { PreguntasPage } from "../pages/Formatos/PreguntasPage";
import { RespuestasPage } from "../pages/Formatos/RespuestasPage";

/* STORE DE AUTENTICACIÓN */
import { useAuthStore } from "../stores/Autenticacion/autenticacionStore";

/* COMPONENTS */
import { Modal } from "../components/Modal/Modal";
import { Announcement } from "../components/General/Announcement";

const Layout: React.FC = () => {
  const location = useLocation();
  const hideSideBar =
    location.pathname === "/" || location.pathname === "/clockIn/clock";
  const { fetchUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const res = await fetchUser();
      if (!res) {
        navigate("/");
      }
    };

    verify();
  }, [fetchUser, navigate]);

  return (
    <section className="flex">
      {/* SIDEBAR SOLO CUANDO NO ESTA EN LOGIN */}
      {!hideSideBar && (
        <SideBar>
          <SidebarItem
            to="/home"
            icon={<BiHomeAlt2 size={15} />}
            text="Inicio"
          />
          <SidebarItem
            to="/users"
            icon={<LuUsersRound size={15} />}
            text="Usuarios"
          />
          <SidebarItem
            to="/clockIn"
            icon={<MdLockClock size={15} />}
            text="Ponchadas"
          />
          <SidebarItem
            to="/finance"
            icon={<RiMoneyDollarCircleLine size={15} />}
            text="Finanzas"
          />
          <SidebarItem
            to="/formats"
            icon={<RiSurveyLine size={15} />}
            text="Formatos"
          />
          <SidebarItem
            to="/training"
            icon={<IoIosFitness size={15} />}
            text="Entrenamiento"
          />
          <SidebarItem
            to="/nutrition"
            icon={<IoRestaurantOutline size={15} />}
            text="Nutrición"
          />
        </SideBar>
      )}

      {/* MODAL PARA CUALQUIER ACCIÓN */}
      <Modal />

      {/* ANUNCIO PARA CUALQUIER MENSAJE */}
      <Announcement />

      {/* RUTAS */}
      <Routes>
        {/* GENERALES */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<InicioPage />} />

        {/* USUARIOS */}
        <Route path="/users/" element={<UsuariosPage />}>
          <Route path="clients" element={<ClientesPage />} />
          <Route path="employees" element={<EmpleadosPage />} />
        </Route>

        {/* PONCHADAS */}
        <Route path="/clockIn/" element={<PonchadasPage />}>
          <Route path="admin" element={<PonchadasAdminPage />} />
          <Route path="clock" element={<PonchadasPoncharPage />} />
        </Route>

        {/* FINANZAS */}
        <Route path="/finance/" element={<FinanzasPage />}>
          <Route path="payments" element={<PagosPage />} />
          <Route path="memberships" element={<MembresiasPage />} />
          <Route path="offers" element={<PromocionesPage />} />
        </Route>

        {/* NUTRICIÓN */}
        <Route path="/nutrition/" element={<NutricionPage />}>
          <Route path="diets" element={<DietasPage />} />
          <Route path="food" element={<AlimentosPage />} />
        </Route>

        {/* ENTRENAMIENTO */}
        <Route path="/training/" element={<EntrenamientoPage />}>
          <Route path="routines" element={<RutinasPage />} />
          <Route path="exercises" element={<EjerciciosPage />} />
          <Route path="reports" element={<ReportesPage />} />
          <Route path="redirectExercises" element={<p>Redireccionando...</p>} />
        </Route>

        {/* FORMATOS */}
        <Route path="/formats/" element={<FormatosPage />}>
          <Route path="questions" element={<PreguntasPage />} />
          <Route path="answers" element={<RespuestasPage />} />
        </Route>

        {/* NOT FOUND */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </section>
  );
};

const MyRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default MyRoutes;
