import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useModal } from "../../../stores/Modal/modalStore";
import { updateStatusCliente } from "../../../api/Usuarios/updateStatusUser";
import { useAnnouncement } from "../../../stores/Announcement/announcementStore";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

export function ModalBodyUpdateState({
  id,
  estatus,
}: {
  id: number;
  estatus: string;
}) {
  const { setMensaje } = useMessageUpdated();
  const { setModal, modalTitle, modalBody } = useModal();
  const { setAnnouncement } = useAnnouncement();

  const handleDelete = async () => {
    if (!id) return;
    try {
      const response = await updateStatusCliente({
        id: id,
        estatus: estatus,
        setMensaje: setMensaje,
      });
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
              Estatus cambiado correctamente
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
              Error al cambiar el estatus
            </p>
          </div>
        );
      }
    } catch (error) {
      setAnnouncement(
        true,
        "bg-red-500",
        <div className="flex items-center justify-center gap-4">
          <FaCircleXmark className="text-xl text-white" />
          <p className="font-medium text-white">Error al cambiar el estatus</p>
        </div>
      );
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[50vh]">
      <div className="flex-1 pr-2">
        <p className="text-gray-800">¿Desea cambiar el estatus?</p>
      </div>
      <div className="flex justify-center w-full gap-4 pt-4 h-fit">
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 rounded-lg bg-neutral-500 hover:bg-neutral-400"
          onClick={() => setModal(false, modalTitle ?? "", modalBody)}
        >
          Cerrar
        </button>
        <button
          className="w-full px-4 py-2 font-medium text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-500"
          onClick={handleDelete}
        >
          Cambiar
        </button>
      </div>
    </div>
  );
}
