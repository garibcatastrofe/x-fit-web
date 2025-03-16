import { motion } from "framer-motion";
import { IoConstruct } from "react-icons/io5";
import { BsFillHexagonFill } from "react-icons/bs";

interface Info {
  name: string;
  active: boolean;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export function Card({ info, onclick }: { info: Info; onclick: () => void }) {
  const IconComponent = info.icon;

  return (
    <motion.div
      className={`flex flex-col items-center justify-center h-64 p-6 text-center rounded-2xl ${
        info.active ? "bg-red-600" : "bg-neutral-300 relative"
      }`}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      whileHover={
        info.active
          ? { scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }
          : {}
      }
      whileTap={info.active ? { scale: 0.9 } : {}}
      onClick={onclick}
    >
      {IconComponent && <IconComponent className="text-white text-8xl" />}
      <h3 className="mt-3 text-2xl font-light text-white">{info.name}</h3>
      {!info.active && (
        <div className="absolute right-4 top-4">
          <div className="relative flex items-center justify-center w-fit h-fit">
            {/* Hexágono girado */}
            <BsFillHexagonFill className="text-6xl text-orange-500 rotate-90" />

            {/* Icono centrado */}
            <IoConstruct className="absolute text-xl text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
