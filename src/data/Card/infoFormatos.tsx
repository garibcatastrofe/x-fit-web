import { FaFileCircleQuestion, FaFileCircleCheck } from "react-icons/fa6";
import { LinkCard } from "../../types/LinkCard";

export const infoFormatos: LinkCard[] = [
  {
    nombre: "Preguntas",
    icon: FaFileCircleQuestion,
    link: "questions",
    active: false,
  },
  {
    nombre: "Respuestas",
    icon: FaFileCircleCheck,
    link: "answers",
    active: false,
  },
];
