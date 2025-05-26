import logo from "../../../../assets/logo_sinFondoLetrasNegras.png";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  Image,
  Font,
  View,
} from "@react-pdf/renderer";

// Registrar fuente
Font.register({
  family: "Poppins",
  fonts: [
    { src: "/fonts/Poppins-Regular.ttf" },
    { src: "/fonts/Poppins-Bold.ttf", fontWeight: "bold" },
  ],
});

export function PdfQrUser({
  usuario,
  qrBase64,
}: {
  usuario: string;
  qrBase64: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} />
        <Image src={logo} style={styles.image} />
        <Text style={styles.title}>Código QR para {usuario}</Text>
        <Image src={qrBase64} style={styles.qrCode} />
        <View style={styles.footer} />
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: 300, marginBottom: 20 },
  title: {
    fontSize: 20,
    color: "#dc2626",
    fontFamily: "Poppins",
    marginBottom: 20,
  },
  qrCode: { width: 500, height: 500 },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 30,
    backgroundColor: "#dc2626",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 30,
    backgroundColor: "#dc2626",
  },
});
