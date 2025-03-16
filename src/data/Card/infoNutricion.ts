import { IoRestaurantOutline } from "react-icons/io5";
import { GiFruitBowl } from "react-icons/gi";
import { LinkCard } from "../../types/LinkCard";

export const infoNutricion: LinkCard[] = [
  {
    nombre: "Dietas",
    icon: IoRestaurantOutline,
    link: "diets",
    active: false,
  },
  {
    nombre: "Alimentos",
    icon: GiFruitBowl,
    link: "food",
    active: false,
  },
];
