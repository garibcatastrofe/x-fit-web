import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { updateEjercicio } from "../../../api/Ejercicios/updateEjercicio";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useModal } from "../../../stores/Modal/modalStore";
import { EjercicioPrimitive } from "../../../types/Ejercicios/EjercicioPrimitive";
import { useAnnouncement } from "../../../stores/Announcement/announcementStore";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

export function ModalBodyUpdate({ dato }: { dato: EjercicioPrimitive }) {
  const { setModal, modalTitle, modalBody } = useModal();
  const { setAnnouncement } = useAnnouncement();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ejercicio_id: dato.ejercicio.id,
      nombre: "",
      descripcion: "",
      repeticiones1: 6,
      repeticiones2: 12,
      descanso: 1,
      ejecucion: "",
      conTempo: "",
      tempo1: 1,
      tempo2: 1,
      tempo3: 1,
      tempo4: 1,
      grupo_muscular: "",
    },
    shouldUnregister: false,
  });

  const { setMensaje } = useMessageUpdated();
  const selectedConTempo = watch("conTempo"); // Observa cambios en el select

  useEffect(() => {
    if (dato) {
      const [repeticiones1, repeticiones2] = dato.ejercicio.repeticiones
        .split("-")
        .map(Number);
      let tempos: number[] = [];

      if (dato.ejercicio.tempo !== "Sin tempo") {
        tempos = dato.ejercicio.tempo.split("-").map(Number);
      }

      reset({
        ejercicio_id: dato.ejercicio.id ?? "",
        nombre: dato.ejercicio.nombre ?? "",
        descripcion: dato.ejercicio.descripcion ?? "",
        repeticiones1: repeticiones1 ?? 99,
        repeticiones2: repeticiones2 ?? 99,
        descanso: dato.ejercicio.descanso ?? "",
        ejecucion: dato.ejercicio.ejecucion ?? "",
        conTempo:
          dato.ejercicio.tempo === "Sin tempo" ? "Sin tempo" : "Con tempo",
        tempo1: dato.ejercicio.tempo === "Sin tempo" ? 1 : tempos[0],
        tempo2: dato.ejercicio.tempo === "Sin tempo" ? 1 : tempos[1],
        tempo3: dato.ejercicio.tempo === "Sin tempo" ? 1 : tempos[2],
        tempo4: dato.ejercicio.tempo === "Sin tempo" ? 1 : tempos[3],
        grupo_muscular: dato.ejercicio.grupo_muscular ?? "",
      });
    }
  }, [dato, reset]);

  const onSubmit = async (data: {
    ejercicio_id: string;
    nombre: string;
    descripcion: string;
    repeticiones1: number;
    repeticiones2: number;
    descanso: number;
    ejecucion: string;
    conTempo: string;
    tempo1: number;
    tempo2: number;
    tempo3: number;
    tempo4: number;
    grupo_muscular: string;
  }) => {
    try {
      const formattedData = {
        ...data,
        setMensaje: setMensaje,
      };

      formattedData.repeticiones1 = Number(formattedData.repeticiones1);
      formattedData.repeticiones2 = Number(formattedData.repeticiones2);

      formattedData.tempo1 = Number(formattedData.tempo1);
      formattedData.tempo2 = Number(formattedData.tempo2);
      formattedData.tempo3 = Number(formattedData.tempo3);
      formattedData.tempo4 = Number(formattedData.tempo4);

      formattedData.descanso = Number(formattedData.descanso);

      if (formattedData.descanso < 1 || formattedData.descanso > 99) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              Ingrese un número entre 1 y 99 para descanso
            </p>
          </div>
        );
        setError("descanso", {
          type: "server",
          message: "Ingrese un número entre 1 y 99 para descanso",
        });
        return;
      }

      if (formattedData.repeticiones1 < 1 || formattedData.repeticiones1 > 99) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              Ingrese un número entre 1 y 99 para repeticiones (1)
            </p>
          </div>
        );
        setError("repeticiones1", {
          type: "server",
          message: "Ingrese un número entre 1 y 99 para repeticiones (1)",
        });
        return;
      }

      if (formattedData.repeticiones2 < 1 || formattedData.repeticiones2 > 99) {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              Ingrese un número entre 1 y 99 para repeticiones (2)
            </p>
          </div>
        );
        setError("repeticiones2", {
          type: "server",
          message: "Ingrese un número entre 1 y 99 para repeticiones (2)",
        });
        return;
      }

      if (formattedData.grupo_muscular === "Ninguno") {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              Seleccione un grupo muscular
            </p>
          </div>
        );
        setError("grupo_muscular", {
          type: "server",
          message: "Seleccione un grupo muscular",
        });
        return;
      }

      let tempo = "";

      if (
        formattedData.conTempo === "ninguno" ||
        formattedData.conTempo === "Sin tempo"
      ) {
        tempo = "Sin tempo";
      } else {
        if (formattedData.tempo1 < 1 || formattedData.tempo1 > 9) {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                Ingrese un número entre 1 y 9 para tempo (1)
              </p>
            </div>
          );
          setError("tempo1", {
            type: "server",
            message: "Ingrese un número entre 1 y 9 para tempo (1)",
          });
          return;
        }

        if (formattedData.tempo2 < 1 || formattedData.tempo2 > 9) {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                Ingrese un número entre 1 y 9 para tempo (2)
              </p>
            </div>
          );
          setError("tempo2", {
            type: "server",
            message: "Ingrese un número entre 1 y 9 para tempo (2)",
          });
          return;
        }

        if (formattedData.tempo3 < 1 || formattedData.tempo3 > 9) {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                Ingrese un número entre 1 y 9 para tempo (3)
              </p>
            </div>
          );
          setError("tempo3", {
            type: "server",
            message: "Ingrese un número entre 1 y 9 para tempo (3)",
          });
          return;
        }

        if (formattedData.tempo4 < 1 || formattedData.tempo4 > 9) {
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                Ingrese un número entre 1 y 9 para tempo (4)
              </p>
            </div>
          );
          setError("tempo4", {
            type: "server",
            message: "Ingrese un número entre 1 y 9 para tempo (4)",
          });
          return;
        }

        tempo =
          formattedData.tempo1.toString() +
          "-" +
          formattedData.tempo2.toString() +
          "-" +
          formattedData.tempo3.toString() +
          "-" +
          formattedData.tempo4.toString();
      }

      const repeticiones =
        formattedData.repeticiones1 + "-" + formattedData.repeticiones2;

      const newAdd: {
        ejercicio_id: string;
        nombre: string;
        descripcion: string;
        repeticiones: string;
        descanso: number;
        ejecucion: string;
        tempo: string;
        grupo_muscular: string;
        setMensaje: (data: { msj: string }) => void;
      } = {
        ejercicio_id: formattedData.ejercicio_id,
        nombre: formattedData.nombre,
        descripcion: formattedData.descripcion,
        repeticiones: repeticiones,
        descanso: formattedData.descanso,
        ejecucion: formattedData.ejecucion,
        tempo: tempo,
        grupo_muscular: formattedData.grupo_muscular,
        setMensaje: setMensaje,
      };

      const response = await updateEjercicio(newAdd);

      if (
        response?.message &&
        response.message.includes("actualizado exitosamente")
      ) {
        setAnnouncement(
          true,
          "bg-green-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleCheck className="text-xl text-white" />
            <p className="font-medium text-white">
              Ejercicio actualizado correctamente
            </p>
          </div>
        );
        setModal(false, modalTitle ?? "", modalBody);
      } else {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              Error al actualizar el ejercicio
            </p>
          </div>
        );
      }
    } catch (error) {
      console.log(error);
      setAnnouncement(
        true,
        "bg-red-500",
        <div className="flex items-center justify-center gap-4">
          <FaCircleXmark className="text-xl text-white" />
          <p className="font-medium text-white">
            Error al actualizar el ejercicio
          </p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[50vh]">
      {/* ID DEL EJERCICIO */}
      <Controller
        name="ejercicio_id"
        control={control}
        render={({ field }) => (
          <input {...field} type="hidden" value={field.value} />
        )}
      />

      <div className="flex-1 pr-2 overflow-y-scroll scrollbar-custom">
        {/* NOMBRE DEL EJERCICIO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Nombre</p>
          <Controller
            name="nombre"
            control={control}
            rules={{ required: "El nombre es necesario" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="text"
                id="nombre"
                placeholder="Nombres del ejercicio"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.nombre && (
            <p className="ml-1 text-red-500">{errors.nombre?.message}</p>
          )}
        </div>

        {/* DESCRIPCIÓN DEL EJERCICIO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Descripción</p>
          <Controller
            name="descripcion"
            control={control}
            rules={{ required: "La descripción es necesaria" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <textarea
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id="descripcion"
                placeholder="Descripción del ejercicio"
                className="w-full h-40 p-4 bg-transparent border-2 border-gray-100 outline-none resize-none rounded-xl"
              />
            )}
          />
          {errors.descripcion && (
            <p className="ml-1 text-red-500">{errors.descripcion?.message}</p>
          )}
        </div>

        {/* REPETICIONES DEL EJERCICIO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Repeticiones</p>
          <div className="flex gap-2">
            <Controller
              name="repeticiones1"
              control={control}
              rules={{ required: "Las repeticiones son necesarias" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  onBlur={onBlur}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                    onChange(val); // Actualiza el estado con solo números
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "-" || e.key === "+") {
                      e.preventDefault(); // Bloquea la entrada de estos caracteres
                    }
                  }}
                  value={value}
                  type="text" // Cambia a "text" para evitar comportamientos extraños con números
                  inputMode="numeric" // Ayuda en móviles
                  pattern="[0-9]*" // Solo números
                  id="repeticiones1"
                  placeholder="6"
                  min={1}
                  max={99}
                  className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
                />
              )}
            />
            <p>-</p>
            <Controller
              name="repeticiones2"
              control={control}
              rules={{ required: "Las repeticiones son necesarias" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  onBlur={onBlur}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                    onChange(val); // Actualiza el estado con solo números
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "-" || e.key === "+") {
                      e.preventDefault(); // Bloquea la entrada de estos caracteres
                    }
                  }}
                  value={value}
                  type="text" // Cambia a "text" para evitar comportamientos extraños con números
                  inputMode="numeric" // Ayuda en móviles
                  pattern="[0-9]*" // Solo números
                  id="repeticiones2"
                  placeholder="12"
                  min={1}
                  max={99}
                  className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
                />
              )}
            />
          </div>
          {errors.repeticiones1 && (
            <p className="ml-1 text-red-500">{errors.repeticiones1?.message}</p>
          )}
          {errors.repeticiones2 && (
            <p className="ml-1 text-red-500">{errors.repeticiones2?.message}</p>
          )}
        </div>

        {/* DESCANSO DEL EJERCICIO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Descanso en minutos</p>
          <Controller
            name="descanso"
            control={control}
            rules={{ required: "El descanso es necesario" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                  onChange(val); // Actualiza el estado con solo números
                }}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "-" || e.key === "+") {
                    e.preventDefault(); // Bloquea la entrada de estos caracteres
                  }
                }}
                value={value}
                type="text" // Cambia a "text" para evitar comportamientos extraños con números
                inputMode="numeric" // Ayuda en móviles
                pattern="[0-9]*" // Solo números
                id="descanso"
                placeholder="2"
                min={1}
                max={99}
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.descanso && (
            <p className="ml-1 text-red-500">{errors.descanso.message}</p>
          )}
        </div>

        {/* EJECUCIÓN DEL EJERCICIO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>URL de ejecución</p>
          <Controller
            name="ejecucion"
            control={control}
            rules={{ required: "La ejecución es necesaria" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <textarea
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id="ejecucion"
                placeholder="Ejecución del ejercicio"
                className="w-full h-40 p-4 bg-transparent border-2 border-gray-100 outline-none resize-none rounded-xl"
              />
            )}
          />
          {errors.ejecucion && (
            <p className="ml-1 text-red-500">{errors.ejecucion?.message}</p>
          )}
        </div>

        {/* SELECT CON TEMPO DE EJERCICIO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>¿Tiene tempo?</p>
          <Controller
            name="conTempo"
            control={control}
            rules={{
              required: "Seleccionar una opción es requerido",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id="genero"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              >
                <option value="Sin tempo">Sin tempo</option>
                <option value="Con tempo">Con tempo</option>
              </select>
            )}
          />
          {errors.conTempo && (
            <p className="ml-1 text-red-500">{errors.conTempo.message}</p>
          )}
        </div>

        {/* INPUT DINÁMICO */}
        {selectedConTempo && selectedConTempo !== "ninguno" && (
          <div className="flex flex-col items-start gap-4 pr-2 mb-4">
            <p>Tempo</p>
            {["Con tempo"].includes(selectedConTempo) && (
              <>
                <Controller
                  name="tempo1"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                          field.onChange(val); // Actualiza el estado con solo números
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "-" || e.key === "+") {
                            e.preventDefault(); // Bloquea la entrada de estos caracteres
                          }
                        }}
                        value={field.value}
                        type="text" // Cambia a "text" para evitar comportamientos extraños con números
                        inputMode="numeric" // Ayuda en móviles
                        pattern="[0-9]*" // Solo números
                        id="tempo1"
                        placeholder="1"
                        min={1}
                        max={9}
                        className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
                      />
                    </>
                  )}
                />
                <Controller
                  name="tempo2"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                          field.onChange(val); // Actualiza el estado con solo números
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "-" || e.key === "+") {
                            e.preventDefault(); // Bloquea la entrada de estos caracteres
                          }
                        }}
                        value={field.value}
                        type="text" // Cambia a "text" para evitar comportamientos extraños con números
                        inputMode="numeric" // Ayuda en móviles
                        pattern="[0-9]*" // Solo números
                        id="tempo2"
                        placeholder="2"
                        min={1}
                        max={9}
                        className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
                      />
                    </>
                  )}
                />
                <Controller
                  name="tempo3"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                          field.onChange(val); // Actualiza el estado con solo números
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "-" || e.key === "+") {
                            e.preventDefault(); // Bloquea la entrada de estos caracteres
                          }
                        }}
                        value={field.value}
                        type="text" // Cambia a "text" para evitar comportamientos extraños con números
                        inputMode="numeric" // Ayuda en móviles
                        pattern="[0-9]*" // Solo números
                        id="tempo3"
                        placeholder="3"
                        min={1}
                        max={9}
                        className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
                      />
                    </>
                  )}
                />
                <Controller
                  name="tempo4"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                          field.onChange(val); // Actualiza el estado con solo números
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "-" || e.key === "+") {
                            e.preventDefault(); // Bloquea la entrada de estos caracteres
                          }
                        }}
                        value={field.value}
                        type="text" // Cambia a "text" para evitar comportamientos extraños con números
                        inputMode="numeric" // Ayuda en móviles
                        pattern="[0-9]*" // Solo números
                        id="tempo4"
                        placeholder="4"
                        min={1}
                        max={9}
                        className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
                      />
                    </>
                  )}
                />
                {errors.tempo1 && (
                  <p className="ml-1 text-red-500">{errors.tempo1.message}</p>
                )}
                {errors.tempo2 && (
                  <p className="ml-1 text-red-500">{errors.tempo2.message}</p>
                )}
                {errors.tempo3 && (
                  <p className="ml-1 text-red-500">{errors.tempo3.message}</p>
                )}
                {errors.tempo4 && (
                  <p className="ml-1 text-red-500">{errors.tempo4.message}</p>
                )}
              </>
            )}
          </div>
        )}

        {/* GRUPO MUSCULAR DEL EJERCICIO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Grupo muscular</p>
          <Controller
            name="grupo_muscular"
            control={control}
            rules={{
              required: "Seleccionar una opción es requerido",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                id="grupo_muscular"
                size={5}
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl scrollbar-custom"
              >
                <option value="ninguno">Seleccione un grupo muscular</option>
                <option value="ABDOMEN">ABDOMEN</option>
                <option value="ADUCTORES">ADUCTORES</option>
                <option value="ANTEBRAZO">ANTEBRAZO</option>
                <option value="BICEPS">BICEPS</option>
                <option value="CALENTAMIENTO">CALENTAMIENTO</option>
                <option value="CARDIOVASCULAR">CARDIOVASCULAR</option>
                <option value="CUADRICEPS">CUADRICEPS</option>
                <option value="DELTOIDES ANTERIOR">DELTOIDES ANTERIOR</option>
                <option value="DELTOIDES MEDIO">DELTOIDES MEDIO</option>
                <option value="DELTOIDES POSTERIOR">DELTOIDES POSTERIOR</option>
                <option value="ESPALDA">ESPALDA</option>
                <option value="GLUTEOS">GLUTEOS</option>
                <option value="ISQUIOSURALES">ISQUIOSURALES</option>
                <option value="PANTORRILLAS">PANTORRILLAS</option>
                <option value="PECTORAL">PECTORAL</option>
                <option value="TRAPECIO">TRAPECIO</option>
                <option value="TRICEPS">TRICEPS</option>
              </select>
            )}
          />
          {errors.grupo_muscular && (
            <p className="ml-1 text-red-500">{errors.grupo_muscular.message}</p>
          )}
        </div>
      </div>
      <div className="flex justify-center w-full gap-4 pt-4 h-fit">
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 rounded-lg bg-neutral-500 hover:bg-neutral-400"
          onClick={() => setModal(false, modalTitle ?? "", modalBody)}
        >
          Cancelar
        </button>
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-500"
          onClick={handleSubmit(onSubmit)}
        >
          Actualizar
        </button>
      </div>
    </div>
  );
}
