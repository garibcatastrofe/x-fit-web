import { FaPersonWalking } from "react-icons/fa6";
import { FaPeoplePulling } from "react-icons/fa6";
import { LinkCard } from "../../types/LinkCard";
import { MdLockClock } from "react-icons/md";

export const infoUsuarios: LinkCard[] = [
  {
    nombre: "Clientes",
    icon: FaPersonWalking,
    link: "clients",
    active: true,
  },
  {
    nombre: "Empleados",
    icon: FaPeoplePulling,
    link: "employees",
    active: true,
  },
  {
    nombre: "Ponchadas",
    icon: MdLockClock,
    link: "clockIn",
    active: false,
  },
];
