import { MdOutlinePayments } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { LinkCard } from "../../types/LinkCard";

export const infoFinanzas: LinkCard[] = [
  {
    nombre: "Pagos",
    icon: MdOutlinePayments,
    link: "payments",
    active: false,
  },
  {
    nombre: "Membresias",
    icon: FaAddressCard,
    link: "memberships",
    active: false,
  },
  {
    nombre: "Promociones",
    icon: BiSolidOffer,
    link: "offers",
    active: false,
  },
];
