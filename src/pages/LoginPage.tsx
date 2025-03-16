import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { RiFacebookCircleFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

import { useAuthStore } from "../stores/Autenticacion/autenticacionStore";
import { PORT } from "../api/PORT";
import { LogotipoBlanco } from "../components/General/LogoBlanco";
import { Logotipo } from '../components/General/Logo'

export function LoginPage() {
  const navigate = useNavigate();
  /* const { setUser } = useUserStore(); */
  const login = useAuthStore((state) => state.fetchUser);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      correo: "",
      password: "",
    },
  });

  const handleLogin = async (dataForm: {
    correo: string;
    password: string;
  }) => {
    try {
      const { correo, password } = dataForm;
      if (correo === "" || password === "") return;

      const response = await fetch(PORT + "/api/v1/usuario-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
        credentials: "include", // Importante para recibir cookies
      });

      const data = await response.json();

      if (response.ok) {
        const res = await login();

        if (res) {
          alert("¡Acceso concedido!");
          navigate("/home");
        } else {
          alert("Acceso denegado");
          navigate("/");
        }
      } else {
        alert("Error: " + data.message);
        setError("correo", { type: "server", message: data.message });
      }
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  const Icons = ({ marginLeft }: { marginLeft: boolean }) => {
    return (
      <div className={`gap-4 flex ${marginLeft && "ml-20"}`}>
        <RiFacebookCircleFill className="text-4xl text-red-600 transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:text-red-400" />
        <AiFillInstagram className="text-4xl text-red-600 transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:text-red-400" />
        <FaYoutube className="text-4xl text-red-600 transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:text-red-400" />
        <IoLogoWhatsapp className="text-4xl text-red-600 transition-all duration-300 hover:scale-110 hover:cursor-pointer hover:text-red-400" />
      </div>
    );
  };

  return (
    <div className="flex w-full h-screen">
      <div className="relative hidden w-full h-full lg:flex">
        <div className="absolute top-0 left-0 flex flex-col items-start justify-center w-full h-full bg-gradient-to-r from-black to-transparent">
          {/* <h2 className="ml-20 font-bold text-white text-9xl">X-FIT</h2> */}
          <div className="w-1/2 mb-8 ml-20">
            <LogotipoBlanco />
          </div>

          <Icons marginLeft={true} />
        </div>
        <div className="w-full h-full bg-center bg-cover bg-custom-pattern"></div>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full bg-white lg:w-2/5">
        <div className="w-full px-4 lg:w-3/4 md:w-3/4">
          <div className="flex justify-center mb-10 lg:hidden">
            <div className="w-1/2">
              <Logotipo />
            </div>
          </div>
          <h1 className="mb-4 text-2xl font-medium text-center">Bienvenido</h1>
          <p className="mb-2">Correo</p>
          <div className="mb-4">
            <Controller
              name="correo"
              control={control}
              defaultValue=""
              rules={{ required: "El correo es obligatorio" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  className="w-full px-4 py-2 transition-all duration-300 outline-none bg-neutral-100 rounded-xl hover:bg-red-100"
                  placeholder="example@gmail.com"
                />
              )}
            />
            {errors.correo && (
              <p className="text-red-500">{errors.correo.message}</p>
            )}
          </div>

          <p className="mb-2">Contraseña</p>
          <div className="mb-4">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "La contraseña es necesaria" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  type="password"
                  className="w-full px-4 py-2 transition-all duration-300 outline-none rounded-xl bg-neutral-100 hover:bg-red-100"
                  placeholder="*******"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            className="w-full px-4 py-2 mb-6 text-center text-white transition-all duration-300 bg-red-500 rounded-xl hover:bg-red-400"
            onClick={handleSubmit(handleLogin)}
          >
            Ingresar
          </button>
        </div>
        <div className="lg:hidden">
          <Icons marginLeft={false} />
        </div>
      </div>
    </div>
  );
}
