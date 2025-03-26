/* import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";


} */
import { useEffect, useState, useRef } from "react";
import JsBarcode from "jsbarcode";

export function CodigoBarrasNormal({ data }: { data: string }) {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, data, {
        format: "CODE128",
        displayValue: false,
      });
    }
  }, [data]);

  return <svg ref={barcodeRef}></svg>;
}

export function CodigoBarrasImage({ data }: { data: string }) {
  const [barcodeImage, setBarcodeImage] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, data, {
        format: "CODE128",
        displayValue: false,
      });
      setBarcodeImage(canvas.toDataURL("image/png"));
    }
  }, [data]);

  return barcodeImage ? (
    <img src={barcodeImage} alt="Código de barras" />
  ) : null;
}
