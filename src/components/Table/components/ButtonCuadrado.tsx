import { motion } from "framer-motion";
import { IconType } from "react-icons";

export function ButtonCuadrado({
  action,
  Icon,
}: {
  action: () => void;
  Icon: IconType;
}) {
  return (
    <motion.div
      onClick={action}
      className="p-4 bg-red-600 rounded-2xl hover:cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // Controla la velocidad y suavidad del efecto
    >
      <Icon className="text-2xl text-white" />
    </motion.div>
  );
}
