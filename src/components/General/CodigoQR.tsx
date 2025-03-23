import { QRCodeCanvas } from "qrcode.react";

export function CodigoQR({ data }: { data: string }) {
  return <QRCodeCanvas value={data} size={200} />;
}
