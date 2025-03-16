import { FaPersonWalking } from "react-icons/fa6";
import { FaPeoplePulling } from "react-icons/fa6";
import { FaRuler } from "react-icons/fa";
import { LinkCard } from '../../types/LinkCard'

export const InfoUsers: LinkCard[] = [
  {
    nombre: "Clientes",
    icon: FaPersonWalking,
    link: "clients"
  },
  {
    nombre: "Empleados",
    icon: FaPeoplePulling,
    link: "employees"
  },
  {
    nombre: "Mediciones",
    icon: FaRuler,
    link: "measures"
  },
];
