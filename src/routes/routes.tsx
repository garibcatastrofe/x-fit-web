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

/* PAGES */
import { LoginPage } from "../pages/LoginPage";
import { InicioPage } from "../pages/InicioPage";
import { UsuariosPage } from "../pages/UsuariosPage";
import { PagosPage } from "../pages/PagosPage";
import { DietasPage } from "../pages/DietasPage";
import { RutinasPage } from "../pages/RutinasPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ClientesPage } from "../pages/ClientesPage";
import { EmpleadosPage } from "../pages/EmpleadosPage";
import { MedicionesPage } from "../pages/MedicionesPage";

/* STORE DE AUTENTICACIÓN */
import { useAuthStore } from "../stores/Autenticacion/autenticacionStore";

/* COMPONENTS */
import { Modal } from '../components/Modal/Modal'

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
            to="/payments"
            icon={<MdOutlinePayments size={15} />}
            text="Pagos"
          />
          <SidebarItem
            to="/diets"
            icon={<IoRestaurantOutline size={15} />}
            text="Dietas"
          />
          <SidebarItem
            to="/routines"
            icon={<IoIosFitness size={15} />}
            text="Rutinas"
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
          <Route path="measures" element={<MedicionesPage />} />
        </Route>
        <Route path="/payments" element={<PagosPage />} />
        <Route path="/diets" element={<DietasPage />} />
        <Route path="/routines" element={<RutinasPage />} />

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
