import {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSide } from "../../stores/Sidebar/sidebarStore";
import { CiLogout } from "react-icons/ci";
import { SideBarContextProps, SidebarItemProps } from "./types/types";
import { useAuthStore } from "../../stores/Autenticacion/autenticacionStore";
import { Logotipo } from "../General/Logo";
import { Empleado } from "../../types/Empleados/Empleado";
import { getUsuarioById } from "../../api/Usuarios/selectByIdUsuario";
import { getInitials, getShortName } from '../../functions/name'

const SideBarContext = createContext<SideBarContextProps>({ expanded: true });

export function SideBar({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const { expanded, setExpanded } = useSide();
  const { logout } = useAuthStore();
  const [usuario, setUsuario] = useState<Empleado>();
  const { user } = useAuthStore();

  useEffect(() => {
    const selectById = async () => {
      const empleado = await getUsuarioById(user == null ? 0 : user.id);
      if (!empleado) {
        console.error("No se encontró empleado con id:", user?.id);
        return;
      }

      setUsuario(empleado);
    };
    selectById();
  }, [user?.id, user]);

  return (
    <div className="">
      <aside
        className={`h-screen top-0 w-64 transition-all duration-300 z-50 absolute bg-white ${
          expanded ? "left-0" : "lg:w-16 lg:left-0 -left-64"
        }`}
      >
        <nav className="flex flex-col h-full border-r shadow-sm">
          <div className="flex items-center justify-end px-3 pt-2 pb-2 mb-24 lg:pt-6">
            <div
              className={`absolute transition-all w-32 top-7 duration-300 flex gap-2 items-center ${
                expanded ? "left-4" : "-left-full opacity-0 pointer-events-none"
              }`}
            >
              <Logotipo />
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className={`p-1.5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-neutral-100 lg:top-6 absolute top-5 lg:static ${
                expanded ? "left-52" : "left-[17rem] lg:mr-1.5 z-50"
              }`}
            >
              {expanded ? (
                <IoMdClose className="text-2xl lg:text-base" />
              ) : (
                <RxHamburgerMenu className="text-2xl lg:text-base" />
              )}
            </button>
          </div>

          <SideBarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SideBarContext.Provider>

          <div className="relative flex p-3 border-t" ref={menuRef}>
            <div className="z-10 flex items-center justify-center p-2 font-bold text-white bg-red-600 rounded-md w-fit h-fit">
              {getInitials(usuario?.nombres ?? "", usuario?.apellidos ?? "")}
            </div>
            <div
              className={`flex justify-between lg:z-0 lg:absolute lg:right-3 lg:top-4 items-center overflow-hidden transition-all duration-300 ${
                expanded ? "w-44 ml-3" : "opacity-0 w-44"
              }`}
            >
              <div className="flex flex-col gap-1 leading-4">
                <h4 className="font-medium">
                  {getShortName(
                    usuario?.nombres ?? "",
                    usuario?.apellidos ?? ""
                  )}
                </h4>
                <span className="text-xs text-neutral-500">
                  {usuario?.correo}
                </span>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="p-2 transition-all duration-300 rounded-md hover:bg-red-50"
              >
                <CiLogout className="text-2xl lg:text-base" />
              </button>
            </div>
          </div>
        </nav>
      </aside>
      <div
        onClick={() => setExpanded(false)}
        className={`absolute top-0 h-screen z-50 lg:hidden lg:pointer-events-none ${
          expanded ? "left-64 w-[calc(100%-16rem)]" : "-left-64 w-0"
        }`}
      ></div>
    </div>
  );
}

export function SidebarItem({ icon, text, alert, to }: SidebarItemProps) {
  const { expanded } = useContext(SideBarContext);

  return (
    <NavLink
      to={to ?? ""}
      className={({ isActive }) =>
        `relative flex items-center justify-center py-2 px-2 my-3 font-normal rounded-md cursor-pointer transition-colors group ${
          isActive ? "bg-red-100 text-red-600" : "hover:bg-red-50 text-gray-800"
        }`
      }
    >
      <div className="w-fit h-fit">{icon}</div>

      <span
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "w-52 ml-3" : "w-0 opacity-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-fit h-fit rounded bg-red-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div className="absolute z-20 invisible p-2 ml-6 text-sm font-medium text-red-800 transition-all translate-x-3 bg-white shadow-md opacity-0 rounded-xl left-full group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </NavLink>
  );
}
