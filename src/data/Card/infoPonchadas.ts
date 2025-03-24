import { LinkCard } from "../../types/LinkCard";
import { LuDoorOpen } from "react-icons/lu";
import { TbTableOptions } from "react-icons/tb";

export const infoPonchadas: LinkCard[] = [
  {
    nombre: "Entrada",
    icon: LuDoorOpen,
    link: "clock",
    active: false,
  },
  {
    nombre: "Gestión",
    icon: TbTableOptions,
    link: "admin",
    active: true,
  },
];
