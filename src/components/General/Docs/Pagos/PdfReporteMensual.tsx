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
import { formatearFecha } from "../../../../functions/date";
import { ConsultaPago } from "../../../../types/Pagos/ConsultaPago";

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

export const PdfReporteMensual = ({ pagos }: { pagos: ConsultaPago }) => {
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
          style={{ width: 300, marginTop: 40, marginBottom: 20, alignSelf: "center" }}
        />
        <Text style={styles.title}>X-FIT NOGALES, SONORA</Text>

        {pagos.data.map((pago, index) => (
          <View key={index} style={styles.section}>
            <View style={styles.row}>
              <Text>ID: {pago.id}</Text>
              <Text>Cliente: {pago.cliente_nombre}</Text>
            </View>
            <View style={styles.row}>
              <Text>
                Fecha Vencimiento: {formatearFecha(pago.fecha_vencimiento)}
              </Text>
              <Text>Monto: ${pago.monto}</Text>
            </View>
          </View>
        ))}
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
  header: { fontSize: 18, marginBottom: 10, textAlign: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
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
