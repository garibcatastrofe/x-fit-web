import { LuServer } from "react-icons/lu";
import { LuServerCrash } from "react-icons/lu";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
/* import { CodigoQR } from "../../components/General/CodigoQR"; */
import { Logotipo } from "../../components/General/Logo";
import { ButtonCuadrado } from "../../components/Table/components/ButtonCuadrado";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { getUsuarioById } from "../../api/Usuarios/selectByIdUsuario";
import { useAnnouncement } from "../../stores/Announcement/announcementStore";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import { Usuario } from "../../types/Usuarios/Usuario";
import { addPonchada } from "../../api/Ponchadas/addPonchada";
import { BsPersonCircle } from "react-icons/bs";

export function PonchadasPoncharPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const [scannedData, setScannedData] = useState<string>(); // Código escaneado
  const [timer, setTimer] = useState(8); // Contador en segundos
  const [progress, setProgress] = useState(100); // Barra de progreso
  const scanBuffer = useRef("");
  const { setAnnouncement } = useAnnouncement();
  const [usuario, setUsuario] = useState<Usuario | null>({
    apellidos: "",
    correo: "",
    estatus: "",
    fecha_nacimiento: "",
    genero: "",
    id: 0,
    nombres: "",
    telefono: "",
  });

  const obtenerUsuario = useCallback(async (): Promise<number> => {
    try {
      console.log("SCANNEDDATA QUE LLEGA: ", scannedData);
      console.log("BUFFER ACTUAL: ", scanBuffer.current);
      const res = await getUsuarioById(Number(scanBuffer.current));
      console.log("RESPUESTA DE USUARIO: ", res);
      if (res.message === "El ID del usuario es necesario") {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              El QR solicitado no es válido
            </p>
          </div>
        );
        return -1;
      } else if (res.statusCode === 404) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">No se encontró al usuario</p>
          </div>
        );
        return -2;
      } else {
        console.log("RES ANTES DE ASIGNAR AL USUARIO: ", res);

        setUsuario({
          id: Number(res.id),
          nombres: res.nombres,
          apellidos: res.apellidos,
          genero: res.genero,
          fecha_nacimiento: res.fecha_nacimiento,
          telefono: res.telefono,
          estatus: res.estatus,
          correo: res.correo,
        });

        console.log("USUARIO DESPUES DE ASIGNAR AL USUARIO: ", usuario?.id);

        const response = await addPonchada({
          usuario_id: res.id,
          fec: new Date(),
        });

        if (response.message === "Ponchada creada exitosamente") {
          setAnnouncement(
            true,
            "bg-green-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleCheck className="text-xl text-white" />
              <p className="font-medium text-white">Puede pasar</p>
            </div>
          );
          return 1;
        } else if (response.message === "No puede pasar, su pago ya vencio") {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                No puede pasar, su pago ya venció
              </p>
            </div>
          );
          return -1;
        } else if (response.message === "No puede pasar, usted ya poncho hoy") {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                No puede pasar, usted ya ponchó hoy
              </p>
            </div>
          );
          return -2;
        } else if (response.message === "Cliente no encontrado") {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                El cliente al que le solicitó la ponchada no existe, consulte a
                soporte lo más pronto posible
              </p>
            </div>
          );
          return -3;
        } else if (response.message === "Pc no encontrado") {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                No se encontró la relación entre pago y cliente, es posible que
                el cliente no tenga un pago registrado, de ser así, consulte a
                soporte
              </p>
            </div>
          );
          return -4;
        } else if (response.message === "Pago no encontrado") {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                No se encontró el pago del cliente, es posible que el cliente no
                tenga un pago registrado, de ser así, consulte a soporte
              </p>
            </div>
          );
          return -5;
        } else if (response.message === "Usuario no encontrado") {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                No se encontró al usuario solicitado
              </p>
            </div>
          );
          return -6;
        } else if (response.message === "Estatus inactivo") {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                El usuario solicitado no se encuentra activo
              </p>
            </div>
          );
          return -7;
        } else if (
          response.details.message === "El usuario para la ponchada no existe"
        ) {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                El ID de usuario proporcionado no existe, por favor intente con
                otro ID
              </p>
            </div>
          );
          return -8;
        } else {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                Ocurrió un error al generar la ponchada, consulte a soporte lo
                más pronto posible
              </p>
            </div>
          );
          return -9;
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      return -8;
    }
  }, [scannedData, setAnnouncement, usuario]); // Dependencias necesarias

  useEffect(() => {
    const handleScan = async (event: KeyboardEvent) => {
      if (isFlipped) return; // ❌ Evita escaneos mientras el timer está activo

      if (event.key === "Enter") {
        setScannedData(scanBuffer.current);

        //Ver si el usuario es válido según el código QR que se haya escaneado
        const selectUser = await obtenerUsuario();

        if (selectUser !== 1) {
          console.log("ENTRÓ A ERRORES USUARIOS");
          setUsuario(null);
          scanBuffer.current = "";
          return;
        }

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
  }, [obtenerUsuario, isFlipped]); // Se incluye obtenerUsuario en las dependencias

  useEffect(() => {
    if (isFlipped) {
      //función para prender el led en /prender
      const prenderLed = async () => {
        try {
          const response = await fetch("http://192.168.100.9/prender");
          const data = await response.json();
          console.log(data); // { status: "prendido" }
        } catch (error) {
          console.error("Error encendiendo el LED:", error);
        }
      };

      prenderLed();

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
  }, [isFlipped]);

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
          <div className="flex items-center gap-8">
            {/* <CodigoQR data={scannedData ?? ""} /> */}
            <BsPersonCircle className="text-red-600 text-7xl" />
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-light">
                ¡Bienvenid{usuario?.genero === "F" ? "a" : "o"} de vuelta!
              </h1>
              <h2 className="text-xl text-red-600">
                {usuario?.nombres + " " + usuario?.apellidos}
              </h2>
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
