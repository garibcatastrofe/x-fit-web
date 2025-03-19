import { HiOutlineX } from "react-icons/hi";
import { useModal } from "../../stores/Modal/modalStore";
import { motion } from "framer-motion";

export function Modal() {
  const { isActivated, setModal, modalTitle, modalBody } = useModal();

  const hacerModalFalso = () => {
    setModal(false, modalTitle ?? "", modalBody);
  };

  return (
    <div
      className={`absolute top-0 left-0 z-[70] flex items-center justify-center w-full h-full ${
        isActivated ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Modal Blanco con animación de rebote */}
      <motion.div
        className="z-[70] p-4 bg-white rounded-lg shadow-lg lg:w-[600px] md:w-[500px] w-[calc(100%-2rem)]"
        initial={{ opacity: 0, y: 30 }} // Comienza un poco abajo
        animate={{
          opacity: isActivated ? 1 : 0,
          y: isActivated ? [30, -10, 0] : 30, // Rebote de arriba a abajo
        }}
        exit={{ opacity: 0, y: 30 }}
        transition={{
          duration: 0.4, // Duración más larga para permitir el rebote
          type: "tween",
          stiffness: 200, // Controla la rigidez de la animación
          damping: 25, // Controla el rebote
        }}
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)", // Esto centra el modal
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-medium">{modalTitle}</h2>
          <HiOutlineX
            onClick={hacerModalFalso}
            className="text-3xl text-gray-600 transition duration-200 cursor-pointer hover:text-escuela"
          />
        </div>
        <div className="p-2 overflow-y-auto scrollbar-custom">{modalBody}</div>
      </motion.div>

      {/* Fondo negro con animación */}
      <motion.div
        className={`absolute top-0 left-0 w-full h-full bg-black/50 z-[60]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActivated ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backdropFilter: "blur(1px)",
          pointerEvents: isActivated ? "auto" : "none",
        }}
        onClick={hacerModalFalso}
      ></motion.div>
    </div>
  );
}
