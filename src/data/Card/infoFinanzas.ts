import { FaAddressCard } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { LinkCard } from "../../types/LinkCard";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export const infoFinanzas: LinkCard[] = [
  {
    nombre: "Pagos",
    icon: RiMoneyDollarCircleFill,
    link: "payments",
    active: true,
  },
  {
    nombre: "Membresías",
    icon: FaAddressCard,
    link: "memberships",
    active: true,
  },
  {
    nombre: "Promociones",
    icon: BiSolidOffer,
    link: "offers",
    active: true,
  },
];
