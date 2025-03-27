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
import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Font,
  View,
} from "@react-pdf/renderer";
import { FaFilePdf } from "react-icons/fa6";
import logo from "../../../assets/logo_sinFondoLetrasNegras.png";
import userlogo from "../../../assets/user.png";
//import JsBarcode from "jsbarcode";

// 📌 1. Registrar la fuente (desde Google Fonts)
Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "/fonts/Poppins-Regular.ttf", // Ruta de la fuente regular
    },
    {
      src: "/fonts/Poppins-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

// Estilos para el documento PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: { fontSize: 15, marginBottom: 40, alignSelf: "center", fontFamily: "Poppins" },
  section: {
    marginBottom: 10,
  },
  bold: { fontWeight: "bold" },
  table: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
    fontFamily: "Poppins",
    fontSize: 10
  },
  /* tableCell: {
    flex: 1,
    padding: 5,
    borderBottom: "1px solid #000",
  }, */
  total: {
    fontWeight: "bold",
    fontSize: 10,
  },
  image: {
    width: 100,
    height: 40,
    objectFit: "contain",
  },
});

export const PDFDocument = ({
  dato,
  promocion,
  membresia,
  clientes,
}: {
  dato: PagoPrimitive;
  promocion?: Promocion;
  membresia?: Membresia;
  clientes: string[];
}) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 30,
            backgroundColor: "#dc2626",
          }}
        ></View>
        <Image
          src={logo}
          style={{ width: 300, marginBottom: 20, alignSelf: "center" }}
        />
        <Text style={styles.title}>X-FIT NOGALES, SONORA S.A. DE C.V.</Text>
        <Text style={{ textAlign: "left", fontFamily: "Poppins", fontSize: 10 }}>
          <Text style={[styles.bold, { fontFamily: "Poppins", fontSize: 10 }]}>RFC:</Text> XXXXXXXXXXXX
        </Text>
        <Text style={{ fontFamily: "Poppins", fontSize: 10 }}>
          <Text style={[styles.bold, { fontFamily: "Poppins", fontSize: 10 }]}>Régimen Fiscal:</Text> 601: Ley General de
          Personas Morales
        </Text>
        <Text style={{ marginBottom: 20, fontFamily: "Poppins", fontSize: 10 }}>
          <Text style={[styles.bold, { fontFamily: "Poppins", fontSize: 10 }]}>Emitido en:</Text> Colonia Calle #1000
        </Text>

        <Text style={[styles.bold, { marginBottom: 15, fontFamily: "Poppins", fontSize: 10 }]}>
          {clientes.length === 1 ? "Cliente" : "Clientes"}:
        </Text>
        {clientes.map((cliente, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: 5,
            }}
          >
            <Image src={userlogo} style={{ width: 10, height: 10 }} />
            <Text style={[styles.section, { flex: 1, fontSize: 10, fontFamily: "Poppins" }]}>{cliente}</Text>
          </View>
        ))}

        <View
          style={{ display: "flex", marginBottom: 20, flexDirection: "row" }}
        >
          <Text style={{ flex: 1, padding: 5, fontFamily: "Poppins", fontSize: 10 }}>No. {dato.id}</Text>
          <Text style={[{ textAlign: "right", flex: 1, padding: 5, fontFamily: "Poppins", fontSize: 10 }]}>
            {formatearFecha(dato.fecha_pago)}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#d4d4d4",
            marginBottom: 20,
          }}
        ></View>

        <View style={[styles.table]}>
          <Text style={{ flex: 1, padding: 5 }}>Membresía</Text>
          <Text style={{ textAlign: "center", flex: 1, padding: 5 }}>
            {dato.membresia_nombre}
          </Text>
          <Text style={{ textAlign: "right", flex: 1, padding: 5 }}>
            ${membresia?.precio}
          </Text>
        </View>
        <View style={[styles.table, { marginBottom: 20 }]}>
          <Text style={{ padding: 5, flex: 1 }}>Promoción</Text>
          <Text style={{ textAlign: "center", padding: 5, flex: 1 }}>
            {dato.promocion_nombre}
          </Text>
          <Text style={{ textAlign: "right", padding: 5, flex: 1 }}>
            -$
            {promocion?.tipo_descuento === "MONTO FIJO"
              ? promocion?.descuento
              : ((promocion?.descuento ?? 0) / 100) * (membresia?.precio ?? 0)}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#d4d4d4",
            marginBottom: 20,
          }}
        ></View>

        <View style={[styles.table, { marginBottom: 15 }]}>
          <Text style={[{ padding: 5, flex: 1 }]}></Text>
          <Text
            style={{
              textAlign: "center",
              padding: 5,
              flex: 1,
            }}
          >
            Total
          </Text>
          <Text style={{ padding: 5, flex: 1, textAlign: "right" }}>
            <Text style={styles.bold}>${dato.monto}</Text>
          </Text>
        </View>

        {promocion?.descuento !== 0 && (
          <Text style={[styles.section, { textAlign: "center", fontFamily: "Poppins", fontSize: 10 }]}>
            <Text style={styles.bold}>Usted ahorró:</Text> $
            {promocion?.tipo_descuento === "MONTO FIJO"
              ? promocion?.descuento
              : ((promocion?.descuento ?? 0) / 100) * (membresia?.precio ?? 0)}
          </Text>
        )}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 30,
            backgroundColor: "#dc2626",
          }}
        ></View>
      </Page>
    </Document>
  );
};

/* function CodigoBarr({
  data,
  onGenerate,
}: {
  data: string;
  onGenerate: (img: string) => void;
}) {
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (qrRef.current) {
      const qrImage = qrRef.current.toDataURL("image/png");
      onGenerate(qrImage);
    }
  }, [data, onGenerate]);

  return <QRCodeCanvas ref={qrRef} value={data} size={150} />;
} */

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
      <div className="flex items-center justify-between mb-8">
        <p>Vista previa</p>
        <div>
          <PDFDownloadLink
            className="flex items-center justify-center gap-2 px-4 py-2 font-medium text-white transition duration-200 bg-red-600 rounded-lg hover:bg-red-500"
            document={
              <PDFDocument
                dato={dato}
                promocion={promocion}
                membresia={membresia}
                clientes={clientes}
              />
            }
            fileName={`pago_detalle_pagado:${dato.fecha_pago}_${dato.id}.pdf`}
          >
            <FaFilePdf className="text-xl" />
            <span>Descargar</span>
            {/* {({ loading }) =>
              loading ? (
                "Generando PDF..."
              ) : (
                <>
                  <FaFilePdf className="text-xl" />
                  <span>Descargar</span>
                </>
              )
            } */}
          </PDFDownloadLink>
        </div>
      </div>
      <div className="w-full h-6 mb-10 bg-red-600"></div>
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
            <div className="flex gap-2 ml-2" key={index}>
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
      <div className="w-full h-6 mt-10 bg-red-600"></div>
    </div>
  );
}
