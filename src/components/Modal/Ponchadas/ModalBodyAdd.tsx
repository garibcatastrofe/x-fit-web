import { useForm, Controller } from "react-hook-form";
import { addPonchada } from "../../../api/Ponchadas/addPonchada";
import { useModal } from "../../../stores/Modal/modalStore";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useAnnouncement } from "../../../stores/Announcement/announcementStore";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

export function ModalBodyAdd() {
  const { setModal, modalTitle, modalBody } = useModal();
  const { setMensaje } = useMessageUpdated();
  const { setAnnouncement } = useAnnouncement();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usuario_id: 0,
    },
  });

  const onSubmit = async (data: { usuario_id: number }) => {
    try {
      const formattedData = {
        ...data,
        fec: new Date(),
      };

      const response = await addPonchada(formattedData);
      const errorMessage = response.message || "Error desconocido";

      if (response.message === "Ponchada creada exitosamente") {
        //console.log("response", response);
        //alert("Ponchada agregada correctamente");
        setAnnouncement(
          true,
          "bg-green-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleCheck className="text-xl text-white" />
            <p className="font-medium text-white">
              ¡Ponchada creada exitosamente!
            </p>
          </div>
        );
        reset();
        setMensaje({ msj: "AGREGADO" });
        setModal(false, modalTitle ?? "", modalBody);
      } else if (response.message === "No puede pasar, su pago ya vencio") {
        alert("No puede pasar, su pago ya venció :(");
        setError("usuario_id", { type: "server", message: errorMessage });
      } else if (response.message === "No puede pasar, usted ya poncho hoy") {
        //alert("No puede pasar, usted ya poncho hoy :(");
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              No puede pasar, usted ya poncho hoy :(
            </p>
          </div>
        );
        setError("usuario_id", { type: "server", message: errorMessage });
      } else if (response.message === "Cliente no encontrado") {
        alert(
          "El cliente al que le solicitó la ponchada no existe, consulte a soporte lo más pronto posible :("
        );
        setError("usuario_id", { type: "server", message: errorMessage });
      } else if (response.message === "Pc no encontrado") {
        alert(
          "No se encontró la relación entre pago y cliente, es posible que el cliente no tenga un pago registrado, de ser así, consulte a soporte"
        );
        setError("usuario_id", { type: "server", message: errorMessage });
      } else if (response.message === "Pago no encontrado") {
        alert(
          "No se encontró el pago del cliente, es posible que el cliente no tenga un pago registrado, de ser así, consulte a soporte"
        );
        setError("usuario_id", { type: "server", message: errorMessage });
      } else if (
        response.details.message === "El usuario para la ponchada no existe"
      ) {
        alert(
          "El ID de usuario proporcionado no existe, por favor intente con otro ID"
        );
      } else {
        alert(
          "Ocurrió un error al generar la ponchada, consulte a soporte lo más pronto posible :("
        );
        setError("usuario_id", { type: "server", message: errorMessage });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[50vh]">
      <div className="flex-1 pr-2 overflow-y-scroll scrollbar-custom">
        {/* ID DEL USUARIO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>ID</p>
          <Controller
            name="usuario_id"
            control={control}
            rules={{ required: "El ID del usuario es requerido" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="number"
                id="usuario_id"
                min={1}
                max={100000000000}
                placeholder="ID del usuario"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.usuario_id && (
            <p className="ml-1 text-red-500">{errors.usuario_id.message}</p>
          )}
        </div>
      </div>

      {/* BOTONES PARA CERRAR Y AGREGAR */}
      <div className="flex justify-center w-full gap-4 pt-4 h-fit">
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 rounded-lg bg-neutral-500 hover:bg-neutral-400"
          onClick={() => setModal(false, modalTitle ?? "", modalBody)}
        >
          Cerrar
        </button>
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-500"
          onClick={handleSubmit(onSubmit)}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
