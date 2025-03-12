import { FaPersonWalking } from "react-icons/fa6";
import { FaPeopleRobbery } from "react-icons/fa6";
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
    icon: FaPeopleRobbery,
    link: "employees"
  },
  {
    nombre: "Mediciones",
    icon: FaRuler,
    link: "measures"
  },
];
