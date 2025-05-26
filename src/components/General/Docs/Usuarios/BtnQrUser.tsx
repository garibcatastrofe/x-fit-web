import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import * as QRCode from "qrcode";
import { PdfQrUser } from "./PdfQrUser";
import { FaRegFilePdf } from "react-icons/fa6";

export function BtnQrUser({
  dato,
}: {
  dato: { usuario: { id: number; nombres: string } };
}) {
  const handleDownload = async () => {
    const { id, nombres } = dato.usuario;

    try {
      const qrBase64 = await QRCode.toDataURL(id.toString(), {
        margin: 0,
        scale: 10,
        color: {
          dark: "#000000",
          light: "#ffffff", // Cambia a "#ffffff00" si quieres fondo transparente
        },
      });

      const blob = await pdf(
        <PdfQrUser usuario={nombres} qrBase64={qrBase64} />
      ).toBlob();

      saveAs(blob, `codigo_qr_${nombres}.pdf`);
    } catch (error) {
      console.error("Error generando PDF:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center justify-center gap-4 p-2 text-red-600 transition duration-200 rounded-lg hover:bg-red-100"
    >
      <FaRegFilePdf className="text-2xl" />
    </button>
  );
}
