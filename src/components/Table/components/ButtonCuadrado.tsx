import { motion } from "framer-motion";
import { IconType } from "react-icons";

export function ButtonCuadrado({
  action,
  Icon,
  rotate,
  color
}: {
  action: () => void;
  Icon: IconType;
  rotate: boolean
  color: string
}) {
  return (
    <motion.div
      onClick={action}
      className={`p-4 rounded-2xl hover:cursor-pointer ${color}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // Controla la velocidad y suavidad del efecto
    >
      <Icon className={`text-2xl text-white ${rotate && "rotate-90"}`} />
    </motion.div>
  );
}
