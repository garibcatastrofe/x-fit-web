import { useForm, Controller } from "react-hook-form";
import { addPago } from "../../../api/Pagos/addPago";
import { useModal } from "../../../stores/Modal/modalStore";
import { useMessageUpdated } from "../../../stores/MessageUpdated/messageUpdatedStore";
import { selectAllPromociones } from "../../../api/Promociones/selectAllPromociones";
import { selectAllMembresias } from "../../../api/Membresias/selectAllMembresias";
import { useEffect, useState } from "react";
import { Membresia } from "../../../types/Membresias/Membresia";
import { Promocion } from "../../../types/Promociones/Promocion";
import { FaUserPlus } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAnnouncement } from "../../../stores/Announcement/announcementStore";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

export function ModalBodyAdd() {
  const { setModal, modalTitle, modalBody } = useModal();
  const { setMensaje } = useMessageUpdated();
  const [membresias, setMembresias] = useState<Membresia[]>([]);
  const [promociones, setPromociones] = useState<Promocion[]>([]);
  const { setAnnouncement } = useAnnouncement();

  const [membresiaSelected, setMembresiaSelected] = useState<Membresia | null>(
    null
  );
  const [promoSelected, setPromoSelected] = useState<Promocion | null>(null);
  const [clientes, setClientes] = useState<number[] | null>([]);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    /* resetField, */
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      monto: 0,
      membresia_id: 0,
      promocion_id: 0,
      clientes: [] as number[],
    },
  });

  const handleMembresiaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMembresia = membresias.find(
      (m) => m.id === Number(e.target.value)
    );
    setMembresiaSelected(selectedMembresia || null);
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
  };

  const onSubmit = async (data: {
    monto: number;
    membresia_id: number;
    promocion_id: number;
    clientes: number[];
  }) => {
    try {
      /* SI ES GRUPAL, VIENEN DE 5 A 10 CLIENTES */
      if (
        membresiaSelected?.tipo === "GRUPAL" &&
        (data.clientes.length < 5 || data.clientes.length > 10)
      ) {
        console.log("SI ES GRUPAL, VIENEN DE 5 A 10 CLIENTES");
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              En un grupal debe estar conformado por un grupo de 5 a 10 clientes
            </p>
          </div>
        );
        return;
      }

      // NO HAY IDS DUPLICADOS
      if (membresiaSelected?.tipo === "GRUPAL") {
        console.log("NO HAY IDS DUPLICADOS");
        const clientesSet = new Set(data.clientes);
        console.log("Clientes: ", clientesSet);
        if (clientesSet.size !== data.clientes.length) {
          console.log("NO HAY IDS DUPLICADOS ANIDADO");
          setAnnouncement(
            true,
            "bg-red-500",
            <div className="flex items-center justify-center gap-4">
              <FaCircleXmark className="text-xl text-white" />
              <p className="font-medium text-white">
                No puede haber clientes duplicados en el grupo. Todos deben ser
                diferentes.
              </p>
            </div>
          );
          return;
        }
      }

      /* SI ES INDIVIDUAL, HAY SOLO UN CLIENTE */
      if (
        membresiaSelected?.tipo === "INDIVIDUAL" &&
        data.clientes.length !== 1
      ) {
        console.log("SI ES INDIVIDUAL, HAY SOLO UN CLIENTE");
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              Solo puede haber un cliente en una membresía individual
            </p>
          </div>
        );
        return;
      }

      const formattedData = {
        ...data,
        setMensaje: setMensaje,
      };

      /* NO A SELECCIONADO UNA MEMBRESIA */
      if (formattedData.membresia_id === 0) {
        console.log("NO A SELECCIONADO UNA MEMBRESIA");
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">Seleccione una membresia</p>
          </div>
        );
        setError("membresia_id", {
          type: "server",
          message: "Seleccione una membresia",
        });
        return;
      }

      /* NO A SELECCIONADO UNA PROMOCION */
      if (formattedData.promocion_id === 0) {
        console.log("NO A SELECCIONADO UNA PROMOCION");
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">Seleccione una promoción</p>
          </div>
        );
        setError("promocion_id", {
          type: "server",
          message: "Seleccione una promoción",
        });
        return;
      }

      const response = await addPago(formattedData);

      if (response.message === "Pago creado exitosamente") {
        console.log("Pago creado exitosamente");
        setAnnouncement(
          true,
          "bg-green-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleCheck className="text-xl text-white" />
            <p className="font-medium text-white">Pago creado exitosamente</p>
          </div>
        );
        reset();
        setMembresiaSelected(null);
        setClientes(null);
        setModal(false, modalTitle ?? "", modalBody);
      } else {
        console.log("A ocurrido un error al agregar el pago");
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex items-center justify-center gap-4">
            <FaCircleXmark className="text-xl text-white" />
            <p className="font-medium text-white">
              A ocurrido un error al agregar el pago
            </p>
          </div>
        );
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
      setMembresias(consulta.data.map((c) => c.membresia));
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

  useEffect(() => {
    const membre = membresiaSelected?.precio;
    const promo = promoSelected?.descuento;
    let final: number;

    if (promoSelected?.tipo_descuento === "MONTO FIJO") {
      final = (membre ?? 0) - (promo ?? 0);
    } else {
      const descPorcentaje = (promo ?? 0) / 100;
      const descTotal = (membre ?? 0) * descPorcentaje;
      final = (membre ?? 0) - descTotal;
    }

    setValue("monto", final);
  }, [promoSelected, membresiaSelected, getValues, setValue]);

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
            <p>
              ID{" "}
              {membresiaSelected?.tipo === "GRUPAL"
                ? "de los clientes"
                : "del cliente"}
            </p>
            {membresiaSelected?.tipo === "GRUPAL" && (
              <div className="flex gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center p-4 mt-2 text-white bg-red-600 rounded-xl disabled:opacity-50"
                  onClick={() =>
                    setClientes(clientes != null ? clientes.slice(0, -1) : [])
                  }
                  disabled={(clientes?.length ?? 0) <= 5}
                >
                  <FaUserMinus className="text-lg" />
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }} // Reduce el tamaño cuando se hace clic
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center p-4 mt-2 text-white bg-red-600 rounded-xl disabled:opacity-50"
                  onClick={() => setClientes([...(clientes ?? []), 0])}
                  disabled={(clientes?.length ?? 0) >= 10}
                >
                  <FaUserPlus className="text-lg" />
                </motion.button>
              </div>
            )}
          </div>

          {errors.clientes && (
            <p className="ml-1 text-red-500">{errors.clientes.message}</p>
          )}
          {clientes?.map((_, index) => (
            <Controller
              key={index}
              name={`clientes.${index}`}
              control={control}
              rules={{ required: "Este campo es requerido" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value ?? ""}
                  type="number"
                  min={1}
                  max={100000000000}
                  placeholder={`ID del cliente`}
                  className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
                />
              )}
            />
          ))}
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
