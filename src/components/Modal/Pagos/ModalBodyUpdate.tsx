import { useEffect, useState } from "react";
import { PagoPrimitive } from "../../../types/Pagos/PagoPrimitive";
import { selectAllPagosClientes } from "../../../api/Pagos/selectAllPagosClientes";
import { Logotipo } from "../../General/Logo";
import { formatearFecha } from "../../../functions/date";
import { selectMembresiaById } from "../../../api/Membresias/selectMembresiaById";
import { selectPromocionById } from "../../../api/Promociones/selectPromocionById";
import { Membresia } from "../../../types/Membresias/Membresia";
import { Promocion } from "../../../types/Promociones/Promocion";
import { FaUser } from "react-icons/fa";
import { CodigoBarras } from "../../General/CodigoBarras";

export function ModalBodyUpdate({ dato }: { dato: PagoPrimitive }) {
  const [clientes, setClientes] = useState<string[]>([]);
  const [promocion, setPromocion] = useState<Promocion>();
  const [membresia, setMembresia] = useState<Membresia>();

  useEffect(() => {
    if (dato.cliente_nombre !== "GRUPAL") {
      const client = [dato.cliente_nombre];
      setClientes(client);
    } else {
      const buscarPagosClientes = async () => {
        const getPagosClientes = await selectAllPagosClientes({
          pago_id: dato.id,
        });

        if (getPagosClientes.data.length === 0) {
          setClientes(["A ocurrido un error al encontrar los clientes :("]);
        } else {
          setClientes(
            getPagosClientes.data.map(
              (cliente) =>
                (cliente.nombres ?? "") + " " + (cliente.apellidos ?? "")
            )
          );
        }
      };

      buscarPagosClientes();
    }

    const buscarMembresia = async () => {
      const getMembresia = await selectMembresiaById(dato.membresia_id);
      if (getMembresia) {
        setMembresia(getMembresia);
      }
    };

    const buscarPromocion = async () => {
      const getPromocion = await selectPromocionById(dato.promocion_id);
      if (getPromocion) {
        setPromocion(getPromocion);
      }
    };

    buscarMembresia();
    buscarPromocion();
  }, [dato.cliente_nombre, dato.id, dato.membresia_id, dato.promocion_id]);

  return (
    <div className="h-full max-h-[50vh] p-4">
      <div className="w-1/2 m-auto mb-8 h-fit">
        <Logotipo />
      </div>
      <p className="m-auto mb-6 font-semibold w-fit">
        X-FIT NOGALES, SONORA S.A. DE C.V.
      </p>
      <p>
        <span className="font-semibold">RFC:</span> XXXXXXXXXXXX
      </p>
      <p>
        <span className="font-semibold">Régimen Fiscal:</span> 601: Ley General
        de Personas Morales
      </p>
      <p className="mb-6">
        <span className="font-semibold">Emitido en:</span> Colonia Calle #1000
      </p>
      <div className="mb-6">
        <p className="mb-2">
          <span className="font-semibold">
            {clientes.length === 1 ? "Cliente" : "Clientes"}:
          </span>
        </p>
        <div className="flex flex-col gap-2">
          {clientes.map((cliente, index) => (
            <div className="flex gap-2 ml-2">
              <FaUser className="text-lg text-red-600" />
              <p key={index}>{cliente}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mb-6">
        <p>
          No. <span className="font-semibold">{dato.id}</span>
        </p>
        <p>{formatearFecha(dato.fecha_pago)}</p>
      </div>
      <div className="w-full h-0.5 rounded-full mb-4 bg-neutral-300"></div>
      <table className="w-full mb-4">
        <tbody>
          <tr>
            <td className="w-1/3">
              <p className="uppercase">Membresia</p>
            </td>
            <td className="w-1/3">
              <p className="m-auto text-center uppercase w-fit">
                {dato.membresia_nombre}
              </p>
            </td>
            <td className="w-1/3">
              <p className="text-end">${membresia?.precio}</p>
            </td>
          </tr>
          <tr>
            <td className="w-1/3">
              <p className="uppercase">Promoción</p>
            </td>
            <td className="w-1/3">
              <p className="m-auto text-center uppercase w-fit">
                {dato.promocion_nombre}
              </p>
            </td>
            <td className="w-1/3">
              <p className="text-end">
                -$
                {promocion?.tipo_descuento === "MONTO FIJO"
                  ? `${promocion?.descuento}`
                  : `${
                      ((promocion?.descuento ?? 0) / 100) *
                      (membresia?.precio ?? 0)
                    }`}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-full h-0.5 rounded-full mb-4 bg-neutral-300"></div>
      <table className="w-full mb-6">
        <tbody>
          <tr>
            <td className="w-1/3"></td>
            <td className="w-1/3">
              <p className="m-auto text-center uppercase w-fit">Total</p>
            </td>
            <td className="w-1/3">
              <p className="font-semibold text-end">${dato.monto}</p>
            </td>
          </tr>
        </tbody>
      </table>
      {promocion?.descuento !== 0 && (
        <p className="mb-6 text-center">
          <span className="font-semibold">Usted ahorró:</span>
          {" $"}
          {promocion?.tipo_descuento === "MONTO FIJO"
            ? promocion.descuento
            : ((promocion?.descuento ?? 0) / 100) * (membresia?.precio ?? 0)}
        </p>
      )}
      <div className="flex justify-center">
        <CodigoBarras data={dato.id.toString()} />
      </div>
    </div>
  );
}
