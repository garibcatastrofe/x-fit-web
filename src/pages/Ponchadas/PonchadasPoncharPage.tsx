import { LuServer } from "react-icons/lu";
import { LuServerCrash } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CodigoQR } from "../../components/General/CodigoQR";
import { Logotipo } from "../../components/General/Logo";
import { ButtonCuadrado } from "../../components/Table/components/ButtonCuadrado";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
//import { getUsuarioById } from "../../api/Usuarios/selectByIdUsuario";
import { useAnnouncement } from "../../stores/Announcement/announcementStore";

export function PonchadasPoncharPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const [scannedData, setScannedData] = useState("#10002"); // Código escaneado
  const [timer, setTimer] = useState(8); // Contador en segundos
  const [progress, setProgress] = useState(100); // Barra de progreso
  const scanBuffer = useRef("");
  const { setAnnouncement } = useAnnouncement();

  useEffect(() => {
    const handleScan = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setScannedData(scanBuffer.current);
        setIsFlipped(true);
        setTimer(8);
        setProgress(100);
        scanBuffer.current = ""; // 🔹 Reset usando .current
      } else {
        scanBuffer.current += event.key;
      }
    };

    document.addEventListener("keydown", handleScan);
    return () => document.removeEventListener("keydown", handleScan);
  }, []);

  useEffect(() => {
    if (isFlipped) {
      /* const obtenerUsuario = async () => {
        try {
          const res = await getUsuarioById(Number(scannedData))

        } catch (error) {
          console.log("Error: ", error)
          setIsFlipped(false)
        }
      } */
      setAnnouncement(
        true,
        "bg-green-500",
        <p className="font-medium text-white">Este es un anuncio!!!</p>
      );

      const interval = setInterval(() => {
        setTimer((prev) => {
          console.log(prev);
          if (prev <= 1) {
            setIsFlipped(false); // Voltea la tarjeta de vuelta
            clearInterval(interval);
            return 8;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isFlipped, setAnnouncement]);

  useEffect(() => {
    setProgress((timer / 8) * 100); // 🔹 Calcula la barra en base al timer
  }, [timer]);

  return (
    <div className="flex items-center justify-center w-full h-screen overflow-y-hidden">
      <div className="absolute w-fit h-fit top-6 left-6">
        <ButtonCuadrado
          action={() => navigate("/clockIn")}
          Icon={IoIosArrowRoundBack}
          rotate={false}
          color="bg-red-600"
        />
      </div>
      <div className="absolute w-fit h-fit top-6 right-6">
        <ButtonCuadrado
          action={() => {}}
          Icon={isFlipped ? LuServer : LuServerCrash}
          rotate={false}
          color={isFlipped ? "bg-neutral-600" : "bg-green-600"}
        />
      </div>
      <div className="relative w-1/2 h-1/2">
        {/* Cara Frontal */}
        <motion.div
          className="absolute flex items-center justify-center w-full h-full p-4 bg-white shadow-md rounded-xl"
          initial={false}
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.6 }}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-center gap-10">
            <CodigoQR data={scannedData} />
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-light">Ramses Garib Flores Cuen</h1>
              <h3 className="text-lg font-medium text-red-600">EMPLEADO</h3>
              <h2 className="text-lg text-neutral-600">#{scannedData}</h2>
            </div>
          </div>
        </motion.div>

        {/* Cara Trasera */}
        <motion.div
          className="absolute flex items-center justify-center w-full h-full p-4 bg-white shadow-md rounded-xl"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-1/2">
            <Logotipo />
          </div>
        </motion.div>
      </div>

      {/* Barra de progreso y contador */}
      {isFlipped && (
        <div
          className={`absolute w-1/3 bottom-20 transition-opacity duration-500 ${
            isFlipped ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-3 overflow-hidden rounded-full shadow-md">
            <div
              className="h-full transition-all bg-red-600"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-lg font-semibold text-center">
            ¡Te {timer === 1 ? "queda" : "quedan"}{" "}
            <span className="font-semibold text-red-600">{timer}</span>{" "}
            {timer === 1 ? "segundo" : "segundos"}!
          </p>
        </div>
      )}
    </div>
  );
}
