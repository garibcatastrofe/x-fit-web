import { motion } from "framer-motion";
import { useAnnouncement } from "../../stores/Announcement/announcementStore";
import { useEffect } from "react";

export function Announcement() {
  const { isActivated, setAnnouncement, color, announcementBody } =
    useAnnouncement();

  useEffect(() => {
    if (isActivated) {
      const timer = setTimeout(() => {
        setAnnouncement(false, color ?? "", announcementBody);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isActivated, setAnnouncement, announcementBody, color]);

  return (
    <motion.div
      className={`fixed bottom-0 left-0 z-[80] flex items-center justify-center w-full p-4 h-fit rounded-t-2xl ${color}`}
      initial={{ y: "100%" }} // Empieza oculto
      animate={{
        y: isActivated ? 0 : "100%", // Se mueve arriba o desaparece
        transition: {
          duration: 0.6,
          type: "spring",
          stiffness: 80, // Reduce la rigidez
          damping: 20,
        },
      }}
      exit={{
        y: "100%", // Se esconde con otro rebote
        transition: {
          duration: 0.6,
          type: "spring",
          stiffness: 80, // Reduce la rigidez
          damping: 20,
        },
      }}
    >
      {announcementBody}
    </motion.div>
  );
}
