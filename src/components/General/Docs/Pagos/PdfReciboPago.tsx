import { PagoPrimitive } from "../../../../types/Pagos/PagoPrimitive";
import { Membresia } from "../../../../types/Membresias/Membresia";
import { Promocion } from "../../../../types/Promociones/Promocion";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  Image,
  Font,
  View,
} from "@react-pdf/renderer";
import logo from "../../../../assets/logo_sinFondoLetrasNegras.png";
import userlogo from "../../../../assets/user.png";
import { formatearFecha } from "../../../../functions/date";

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

export const PdfReciboPago = ({
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
        <Text style={styles.title}>X-FIT NOGALES, SONORA</Text>
        {/* <Text
          style={{ textAlign: "left", fontFamily: "Poppins", fontSize: 10 }}
        >
          <Text style={[styles.bold, { fontFamily: "Poppins", fontSize: 10 }]}>
            RFC:
          </Text>{" "}
          XXXXXXXXXXXX
        </Text>
        <Text style={{ fontFamily: "Poppins", fontSize: 10 }}>
          <Text style={[styles.bold, { fontFamily: "Poppins", fontSize: 10 }]}>
            Régimen Fiscal:
          </Text>{" "}
          601: Ley General de Personas Morales
        </Text>
        <Text style={{ marginBottom: 20, fontFamily: "Poppins", fontSize: 10 }}>
          <Text style={[styles.bold, { fontFamily: "Poppins", fontSize: 10 }]}>
            Emitido en:
          </Text>{" "}
          Colonia Calle #1000
        </Text> */}

        <Text
          style={[
            styles.bold,
            { marginBottom: 15, fontFamily: "Poppins", fontSize: 10 },
          ]}
        >
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
            <Text
              style={[
                styles.section,
                { flex: 1, fontSize: 10, fontFamily: "Poppins" },
              ]}
            >
              {cliente}
            </Text>
          </View>
        ))}

        <View
          style={{ display: "flex", marginBottom: 20, flexDirection: "row" }}
        >
          <Text
            style={{ flex: 1, padding: 5, fontFamily: "Poppins", fontSize: 10 }}
          >
            No. {dato.id}
          </Text>
          <Text
            style={[
              {
                textAlign: "right",
                flex: 1,
                padding: 5,
                fontFamily: "Poppins",
                fontSize: 10,
              },
            ]}
          >
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
          <Text
            style={[
              styles.section,
              { textAlign: "center", fontFamily: "Poppins", fontSize: 10 },
            ]}
          >
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

// Estilos para el documento PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    marginBottom: 40,
    alignSelf: "center",
    fontFamily: "Poppins",
  },
  section: {
    marginBottom: 10,
  },
  bold: { fontWeight: "bold" },
  table: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
    fontFamily: "Poppins",
    fontSize: 10,
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
