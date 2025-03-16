import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { useModal } from "../../../stores/Modal/modalStore";
import { deleteCliente } from "../../../api/Clientes/deleteCliente";

export function ModalBodyDelete({ id }: { id: number }) {
  const { setMensaje } = useMessageUpdated();
  const { setModal, modalTitle, modalBody } = useModal();

  const handleDelete = async () => {
    if (!id) return;
    try {
      const response = await deleteCliente({
        id: id,
        setMensaje: setMensaje,
      });
      if (response?.success) {
        alert("Cliente eliminado correctamente");
        setModal(false, modalTitle ?? "", modalBody);
      } else {
        alert("Error al eliminar cliente.");
      }
    } catch (error) {
      alert("Error al eliminar cliente.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-64">
      <div className="flex-1 pr-2">
        <p className="text-gray-800">
          ¿Está seguro de que desea eliminar al cliente de ID: {id}?
        </p>
        <p className="mb-4">
          Esta acción es <span className="font-semibold">irreversible</span>
        </p>
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
          Eliminar
        </button>
      </div>
    </div>
  );
}
