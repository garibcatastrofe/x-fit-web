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
import { MdOutlinePayments } from "react-icons/md";
import { IoIosFitness } from "react-icons/io";
import { IoRestaurantOutline } from "react-icons/io5";
import { RiSurveyLine } from "react-icons/ri";

/* PAGES */
import { LoginPage } from "../pages/LoginPage";
import { InicioPage } from "../pages/InicioPage";
import { UsuariosPage } from "../pages/Usuarios/UsuariosPage";
import { FinanzasPage } from "../pages/Finanzas/FinanzasPage";
import { DietasPage } from "../pages/Nutricion/DietasPage";
import { EntrenamientoPage } from "../pages/Entrenamiento/EntrenamientoPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ClientesPage } from "../pages/Usuarios/ClientesPage";
import { EmpleadosPage } from "../pages/Usuarios/EmpleadosPage";
import { PagosPage } from "../pages/Finanzas/PagosPage";
import { MembresiasPage } from "../pages/Finanzas/MembresiasPage";
import { PromocionesPage } from "../pages/Finanzas/PromocionesPage";
import { FormatosPage } from "../pages/Formatos/FormatosPage";
import { PonchadasPage } from "../pages/Usuarios/PonchadasPage";
import { NutricionPage } from "../pages/Nutricion/NutricionPage";
import { AlimentosPage } from "../pages/Nutricion/AlimentosPage";
import { EjerciciosPage } from "../pages/Entrenamiento/EjerciciosPage";
import { ReportesPage } from "../pages/Entrenamiento/ReportesPage";
import { RutinasPage } from "../pages/Entrenamiento/RutinasPage";
import { PreguntasPage } from "../pages/Formatos/PreguntasPage";
import { RespuestasPage } from "../pages/Formatos/RespuestasPage";

/* STORE DE AUTENTICACIÓN */
import { useAuthStore } from "../stores/Autenticacion/autenticacionStore";

/* COMPONENTS */
import { Modal } from "../components/Modal/Modal";

const Layout: React.FC = () => {
  const location = useLocation();
  const hideSideBar = location.pathname === "/";
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
            to="/finance"
            icon={<MdOutlinePayments size={15} />}
            text="Finanzas"
          />
          <SidebarItem
            to="/nutrition"
            icon={<IoRestaurantOutline size={15} />}
            text="Nutrición"
          />
          <SidebarItem
            to="/training"
            icon={<IoIosFitness size={15} />}
            text="Entrenamiento"
          />
          <SidebarItem
            to="/formats"
            icon={<RiSurveyLine size={15} />}
            text="Formatos"
          />
        </SideBar>
      )}

      {/* MODAL PARA CUALQUIER ACCIÓN */}
      <Modal />

      {/* RUTAS */}
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/home" element={<InicioPage />} />
        <Route path="/users/" element={<UsuariosPage />}>
          <Route path="clients" element={<ClientesPage />} />
          <Route path="employees" element={<EmpleadosPage />} />
          <Route path="lockIn" element={<PonchadasPage />} />
        </Route>
        <Route path="/finance/" element={<FinanzasPage />}>
          <Route path="payments" element={<PagosPage />} />
          <Route path="memberships" element={<MembresiasPage />} />
          <Route path="offers" element={<PromocionesPage />} />
        </Route>
        <Route path="/nutrition/" element={<NutricionPage />}>
          <Route path="diets" element={<DietasPage />} />
          <Route path="food" element={<AlimentosPage />} />
        </Route>
        <Route path="/training/" element={<EntrenamientoPage />}>
          <Route path="routines" element={<RutinasPage />} />
          <Route path="exercises" element={<EjerciciosPage />} />
          <Route path="reports" element={<ReportesPage />} />
        </Route>
        <Route path="/formats/" element={<FormatosPage />}>
          <Route path="questions" element={<PreguntasPage />} />
          <Route path="answers" element={<RespuestasPage />} />
        </Route>

        {/* Ruta no encontrada */}
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
