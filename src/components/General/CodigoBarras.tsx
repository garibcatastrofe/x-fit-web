import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

export function CodigoBarras({ data }: { data: string }) {
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
