import { motion } from "framer-motion";

interface Info {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export function Card({ info, onclick }: { info: Info; onclick: () => void }) {
  const IconComponent = info.icon;

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-64 p-6 text-center bg-red-500 rounded-2xl"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
      }}
      whileTap={{ scale: 0.9 }}
      onClick={onclick}
    >
      {IconComponent && <IconComponent className="text-white text-8xl" />}
      <h3 className="mt-3 text-2xl font-light text-white">{info.name}</h3>
    </motion.div>
  );
}
