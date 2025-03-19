import { useForm, Controller } from "react-hook-form";
import { addPago } from "../../../api/Pagos/addPago";
import { useModal } from "../../../stores/Modal/modalStore";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { selectAllPromociones } from "../../../api/Promociones/selectAllPromociones";
import { selectAllMembresias } from "../../../api/Membresias/selectAllMembresias";
import { useEffect, useState } from "react";
import { Membresia } from "../../../types/Membresias/Membresia";
import { Promocion } from "../../../types/Promociones/Promocion";

export function ModalBodyAdd() {
  const { setModal, modalTitle, modalBody } = useModal();
  const { setMensaje } = useMessageUpdated();
  const [membresias, setMembresias] = useState<Membresia[]>([]);
  const [promociones, setPromociones] = useState<Promocion[]>([]);

  const [tipoMembresia, setTipoMembresia] = useState<string | null>(null);
  const [promoSelected, setPromoSelected] = useState<Promocion | null>(null);
  const [clientes, setClientes] = useState<number[] | null>([]);

  const handleMembresiaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMembresia = membresias.find(
      (m) => m.id === Number(e.target.value)
    );
    setTipoMembresia(selectedMembresia?.tipo || null);
    // Reiniciar solo el campo "clientes"
    //resetField("clientes");
    setValue("clientes", []);
    setValue("monto", selectedMembresia?.precio ?? 0);

    if (selectedMembresia?.tipo === "INDIVIDUAL") {
      setClientes(null);
      setClientes([0]); // Solo un input
    } else {
      setClientes(null);
      setClientes(Array(5).fill(0)); // Mínimo 5 para GRUPAL
    }
  };

  const handlePromocionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPromo = promociones.find(
      (p) => p.id === Number(e.target.value)
    );
    setPromoSelected(selectedPromo || null);
    console.log("Promoción seleccionada: ", selectedPromo);
  };

  const {
    control,
    handleSubmit,
    setError,
    reset,
    /* resetField, */
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      monto: 0,
      membresia_id: 0,
      promocion_id: 0,
      clientes: [] as number[],
    },
  });

  const onSubmit = async (data: {
    monto: number;
    membresia_id: number;
    promocion_id: number;
    clientes: number[];
  }) => {
    try {
      console.log("ENTRANDO A onSubmit");
      if (tipoMembresia === "GRUPAL" && data.clientes.length < 5) {
        console.log("GRUPAL");
        console.log("DEBE HABER AL MENOS 5 CLIENTES");
        setError("clientes", {
          type: "manual",
          message: "Debe haber al menos 5 clientes para una membresía grupal",
        });
        return;
      }

      if (tipoMembresia === "INDIVIDUAL" && data.clientes.length !== 1) {
        console.log("INDIVIDUAL");
        console.log("SOLO PUEDE HABER UN CLIENTE");
        setError("clientes", {
          type: "manual",
          message: "Solo puede haber un cliente en una membresía individual",
        });
        return;
      }

      const formattedData = {
        ...data,
        setMensaje: setMensaje,
      };

      console.log("Datos a enviar:", formattedData); // Agrega esto para verificar

      if (formattedData.membresia_id === 0) {
        console.log("SELECCIONE UNA MEMBRESIA");
        setError("membresia_id", {
          type: "server",
          message: "Seleccione una membresia",
        });
        return;
      } else if (formattedData.promocion_id === 0) {
        console.log("SELECCIONE UNA PROMOCIÓN");
        setError("promocion_id", {
          type: "server",
          message: "Seleccione una promoción",
        });
        return;
      }

      const response = await addPago(formattedData);

      if (response.message === "Pago creado exitosamente") {
        console.log("response", response);
        alert("Pago agregado correctamente");
        reset();
        setTipoMembresia(null);
        setClientes(null);
        setModal(false, modalTitle ?? "", modalBody);
      } else {
        const errorMessage = response.data || "Error desconocido";
        setError("monto", { type: "server", message: errorMessage });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    const obtenerMembresias = async () => {
      const consulta = await selectAllMembresias({
        buscarSiguiente: false,
        buscarModalFilter: false,
      });
      setMembresias(consulta);
    };

    const obtenerPromociones = async () => {
      const consulta = await selectAllPromociones({
        buscarSiguiente: false,
        buscarModalFilter: false,
      });
      setPromociones(consulta);
    };

    obtenerMembresias();
    obtenerPromociones();
  }, []);

  return (
    <div className="flex flex-col h-full max-h-[50vh]">
      <div className="flex-1 pr-2 overflow-y-scroll scrollbar-custom">
        {/* MEMBRESIAS */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Membresias</p>
          <Controller
            name="membresia_id"
            control={control}
            rules={{ required: "Seleccionar una opción es requerido" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={(e) => {
                  onChange(e);
                  handleMembresiaChange(e);
                }}
                value={value}
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl scrollbar-custom"
                size={5}
              >
                <option value={0}>Seleccione una membresía</option>
                {membresias.map((membresia, index) => (
                  <option key={index} value={membresia.id}>
                    {membresia.nombre}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.membresia_id && (
            <p className="ml-1 text-red-500">{errors.membresia_id.message}</p>
          )}
        </div>

        {/* PROMOCIONES */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Promociones</p>
          <Controller
            name="promocion_id"
            control={control}
            rules={{
              required: "Seleccionar una opción es requerido",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <select
                onBlur={onBlur}
                onChange={(e) => {
                  onChange(e);
                  handlePromocionChange(e);
                }}
                value={value}
                id="promocion_id"
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl scrollbar-custom"
                size={5}
              >
                <option value={0}>Seleccione una promoción</option>
                {promociones.map((promocion, index) => (
                  <option key={index} value={promocion.id}>
                    {promocion.nombre}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.promocion_id && (
            <p className="ml-1 text-red-500">{errors.promocion_id.message}</p>
          )}
          <p>
            {promoSelected == null
              ? ""
              : `Tipo descuento: ${promoSelected?.tipo_descuento}, Descuento:
            ${promoSelected?.descuento}`}
          </p>
        </div>

        {/* MONTO DEL PAGO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <p>Monto</p>
          <Controller
            name="monto"
            control={control}
            rules={{ required: "El monto es requerido" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type="number"
                id="monto"
                placeholder="Monto del pago"
                disabled={true}
                className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
              />
            )}
          />
          {errors.monto && (
            <p className="ml-1 text-red-500">{errors.monto.message}</p>
          )}
        </div>

        {/* CLIENTES DEL PAGO */}
        <div className="flex flex-col items-start gap-4 mb-2">
          <div className="flex items-center justify-between w-full">
            <p>ID de clientes</p>
            {tipoMembresia === "GRUPAL" && (
              <button
                type="button"
                className="px-4 py-2 mt-2 text-white bg-red-600 rounded"
                onClick={() => setClientes([...(clientes ?? []), 0])}
              >
                Agregar Cliente
              </button>
            )}
          </div>

          {clientes?.map((cliente, index) => (
            <Controller
              key={index}
              name={`clientes.${index}`}
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  type="number"
                  min={1}
                  max={1000000}
                  placeholder="ID del cliente"
                  className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
                />
              )}
            />
          ))}

          {errors.clientes && (
            <p className="ml-1 text-red-500">{errors.clientes.message}</p>
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
