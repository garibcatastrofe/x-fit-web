import Container from "../components/PageContainer/PageContainer";
import { useAuthStore } from "../stores/Autenticacion/autenticacionStore";
import { useEffect, useState } from "react";
import { getUsuarioById } from "../api/Usuarios/selectByIdUsuario";
import { Empleado } from "../types/Empleados/Empleado";
import { getShortName } from "../functions/name";

export function InicioPage() {
  const { user } = useAuthStore();
  const [usuario, setUsuario] = useState<Empleado>();

  useEffect(() => {
    const selectById = async () => {
      const empleado = await getUsuarioById(user == null ? 0 : user.id);
      if (!empleado) {
        console.error("No se encontró empleado con id:", user?.id);
        return;
      }
      setUsuario(empleado);
    };
    selectById();
  }, [user?.id, user]);

  const formatDate = (date: Date) => {
    const dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const diaSemana = dias[date.getDay()];
    const diaMes = date.getDate();
    const mes = meses[date.getMonth()];
    const año = date.getFullYear();

    return `${diaSemana} ${diaMes} de ${mes} del ${año}`;
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Asegura dos dígitos
    const seconds = date.getSeconds().toString().padStart(2, "0"); // Asegura dos dígitos
    const amPm = hours >= 12 ? "p.m." : "a.m.";

    hours = hours % 12 || 12; // Convierte 0 en 12 para formato de 12 horas

    return `${hours}:${minutes}:${seconds} ${amPm}`;
  };

  const [dateTime, setDateTime] = useState({
    date: formatDate(new Date()),
    time: formatTime(new Date()),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime({
        date: formatDate(new Date()),
        time: formatTime(new Date()),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container title="Inicio">
      <div className="flex flex-col items-center justify-center h-full px-4">
        <p className="text-2xl font-semibold lg:text-6xl md:text-4xl text-neutral-900">
          ¡Bienvenido,{" "}
          <span className="text-red-600">
            {getShortName(usuario?.nombres ?? "", usuario?.apellidos ?? "")}
          </span>
          !
        </p>
        <p className="mt-4 text-xl font-semibold lg:text-3xl md:text-2xl text-neutral-900">
          {dateTime.date}
        </p>
        <p className="mt-2 text-xl font-semibold lg:text-3xl md:text-2xl text-neutral-900">
          {dateTime.time}
        </p>
      </div>
    </Container>
  );
}
