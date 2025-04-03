import { MdOutlinePayments } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { LinkCard } from "../../types/LinkCard";

export const infoFinanzas: LinkCard[] = [
  {
    nombre: "Pagos",
    icon: MdOutlinePayments,
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
    active: false,
  },
];
