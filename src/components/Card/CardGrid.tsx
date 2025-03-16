import { motion } from "framer-motion";
import { Card } from "./Card";
import { useModal } from "../../stores/Modal/modalStore";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LinkCard } from "../../types/LinkCard";

interface CardGridInterface {
  isLink: boolean;
  isBigLink: boolean;
  infoArray: LinkCard[];
  modalTitle: string;
  modalBody: ReactNode | null;
}

export function CardGrid({
  isLink,
  isBigLink,
  infoArray,
  modalTitle,
  modalBody,
}: CardGridInterface) {
  const { setModal } = useModal();
  return (
    <div className="w-full max-h-full overflow-y-auto scrollbar-custom">
      {!isLink && (
        <motion.div
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex justify-between mb-4"
        >
          <h2 className="mb-4 text-3xl font-light text-start text-escuela">
            Generar solicitud
          </h2>
        </motion.div>
      )}

      <div
        className={`${
          isBigLink
            ? "flex flex-wrap justify-center lg:gap-6 md:gap-6 lg:px-8 md:px-6 px-2 py-2"
            : "grid grid-cols-1 gap-6 p-4 overflow-hidden md:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {infoArray.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`w-full p-4 md:w-1/3 lg:w-1/4 ${
              isLink && !info.active && "relative"
            }`}
          >
            {isLink && info.active ? (
              <Link to={info.link}>
                <Card
                  info={{
                    name: info.nombre,
                    icon: info.icon,
                    active: info.active,
                  }}
                  onclick={() => {}}
                />
              </Link>
            ) : isLink && !info.active ? (
              <Card
                info={{
                  name: info.nombre,
                  icon: info.icon,
                  active: info.active,
                }}
                onclick={() => {}}
              />
            ) : (
              <Card
                info={{
                  name: info.nombre,
                  icon: info.icon,
                  active: info.active,
                }}
                onclick={() => setModal(true, modalTitle, modalBody)}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
