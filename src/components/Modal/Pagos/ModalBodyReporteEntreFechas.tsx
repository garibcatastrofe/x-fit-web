import { useForm, Controller } from "react-hook-form";
import { selectAllPagos } from "../../../api/Pagos/selectAllPagos";
import { useModal } from "../../../stores/Modal/modalStore";
import { PdfReporteMensual } from "../../General/Docs/Pagos/PdfReporteMensual";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { ConsultaPago } from "../../../types/Pagos/ConsultaPago";

export function ModalBodyReporteEntreFechas() {
  const { setModal, modalTitle, modalBody } = useModal();

  const handleDownload = async ({
    pagos,
    fecha_inicio,
    fecha_final,
  }: {
    pagos: ConsultaPago;
    fecha_inicio: string;
    fecha_final: string;
  }) => {
    try {
      const blob = await pdf(<PdfReporteMensual pagos={pagos} />).toBlob();

      saveAs(
        blob,
        `pagos_${
          pagos.data.length === 0 ? "" : fecha_inicio + " hasta " + fecha_final
        }.pdf`
      );
    } catch (error) {
      console.error("Error generando PDF:", error);
    }
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fecha_inicio: "",
      fecha_final: "",
    },
  });

  const onSubmit = async (data: {
    fecha_inicio: string;
    fecha_final: string;
  }) => {
    try {
      console.log(data.fecha_inicio);
      console.log(data.fecha_final);
      const fechaInicio = new Date(`${data.fecha_inicio}T00:00:00`);
      const fechaFinal = new Date(`${data.fecha_final}T00:00:00`);
      console.log(fechaInicio);
      console.log(fechaFinal);

      if (fechaInicio >= fechaFinal) {
        setError("fecha_inicio", {
          type: "server",
          message:
            "La fecha de inicio no puede ser mayor o igual a la fecha de vencimiento",
        });
        return;
      }

      const formattedData = {
        buscarSiguiente: false,
        needData: {
          buscarDesdeModal: false,
          data: {
            page: 1,
            perPage: 100000,
            order: "asc",
            orderBy: "fecha_vencimiento",
            checkFilters: true,
            filters: [
              {
                campo: "fecha_vencimiento",
                operador: ">=" as "=" | "!=" | "<" | "<=" | ">" | ">=",
                valor: data.fecha_inicio,
              },
              {
                campo: "fecha_vencimiento",
                operador: "<=" as "=" | "!=" | "<" | "<=" | ">" | ">=",
                valor: data.fecha_final,
              },
            ],
          },
        },
      };

      selectAllPagos(formattedData).then((response) => {
        console.log(response);
        if (response) {
          handleDownload({
            pagos: response,
            fecha_inicio: data.fecha_inicio,
            fecha_final: data.fecha_final,
          });
        } else {
          alert("No se encontraron pagos.");
          console.log("No se encontraron pagos");
        }
      });
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[50vh]">
      <div className="flex-1 pr-2 overflow-y-scroll scrollbar-custom">
        <div className="flex items-center justify-center w-full gap-4">
          {/* FECHA DE INICIO */}
          <div className="flex flex-col items-start flex-1 gap-4 my-4">
            <p>Inicio</p>
            <Controller
              name="fecha_inicio"
              control={control}
              rules={{ required: "La fecha de inicio es requerida" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  type="date"
                  id="fecha_inicio"
                  className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
                />
              )}
            />
          </div>

          {/* FECHA FINAL */}
          <div className="flex flex-col items-start flex-1 gap-4 my-4">
            <p>Final</p>
            <Controller
              name="fecha_final"
              control={control}
              rules={{ required: "La fecha de fin es requerida" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  type="date"
                  id="fecha_final"
                  className="w-full p-4 bg-transparent border-2 border-gray-100 outline-none rounded-xl"
                />
              )}
            />
            {errors.fecha_inicio && (
              <p className="ml-1 text-red-500">{errors.fecha_inicio.message}</p>
            )}
            {errors.fecha_final && (
              <p className="ml-1 text-red-500">{errors.fecha_final.message}</p>
            )}
          </div>
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
          Generar
        </button>
      </div>
    </div>
  );
}
