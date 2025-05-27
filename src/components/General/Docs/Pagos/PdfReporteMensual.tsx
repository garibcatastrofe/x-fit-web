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
          style={{
            width: 300,
            marginTop: 40,
            marginBottom: 20,
            alignSelf: "center",
          }}
        />
        <Text style={styles.title}>X-FIT NOGALES, SONORA</Text>

        <View
          style={[
            styles.fila,
            { backgroundColor: "#dc2626", color: "#ffffff" },
          ]}
        >
          <Text style={styles.columna}>ID</Text>
          <Text style={styles.columna}>Nombre</Text>
          <Text style={styles.columna}>Último pago</Text>
          <Text style={styles.columna}>Fecha vencimiento</Text>
        </View>

        {pagos.data.map((pago, index) => {
          const esPar = index % 2 === 0;

          return (
            <View
              style={[styles.fila, esPar ? styles.filaPar : styles.filaImpar]}
            >
              <Text style={styles.columna}>{pago.id}</Text>
              <Text style={styles.columna}>{pago.cliente_nombre}</Text>
              <Text style={styles.columna}>${pago.monto}</Text>
              <Text style={styles.columna}>
                {formatearFecha(pago.fecha_vencimiento)}
              </Text>
            </View>
          );
        })}
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
    /* justifyContent: "center", */
  },
  title: {
    fontSize: 15,
    marginBottom: 40,
    alignSelf: "center",
    fontFamily: "Poppins",
  },
  fila: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  filaPar: {
    backgroundColor: "#f9f9f9",
  },
  filaImpar: {
    backgroundColor: "#e5e5e5",
  },
  encabezado: {
    backgroundColor: "#d0d0d0",
    borderBottomWidth: 1,
    borderColor: "#999",
  },
  columna: {
    flex: 1,
    textAlign: "left",
    fontSize: 10,
    fontFamily: "Poppins",
  },
});
