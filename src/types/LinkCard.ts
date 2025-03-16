import { IconType } from "react-icons";

export interface LinkCard {
  nombre: string;
  icon: IconType;
  link: string;
  active: boolean;
}
