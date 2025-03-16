import { FaPersonChalkboard } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { TbCalendarStar } from "react-icons/tb";
import { LinkCard } from "../../types/LinkCard";

export const infoEntrenamiento: LinkCard[] = [
  {
    nombre: "Rutinas",
    icon: TbCalendarStar,
    link: "routines",
    active: false,
  },
  {
    nombre: "Ejercicios",
    icon: FaPersonChalkboard,
    link: "exercises",
    active: false,
  },
  {
    nombre: "Reportes",
    icon: TbReportAnalytics,
    link: "reports",
    active: false,
  },
];
