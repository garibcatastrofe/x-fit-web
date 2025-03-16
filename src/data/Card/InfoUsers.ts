import { FaPersonWalking } from "react-icons/fa6";
import { FaPeoplePulling } from "react-icons/fa6";
import { FaRuler } from "react-icons/fa";
import { LinkCard } from '../../types/LinkCard'

export const InfoUsers: LinkCard[] = [
  {
    nombre: "Clientes",
    icon: FaPersonWalking,
    link: "clients",
    active: true
  },
  {
    nombre: "Empleados",
    icon: FaPeoplePulling,
    link: "employees",
    active: false
  },
  {
    nombre: "Mediciones",
    icon: FaRuler,
    link: "measures",
    active: false,
  },
];
