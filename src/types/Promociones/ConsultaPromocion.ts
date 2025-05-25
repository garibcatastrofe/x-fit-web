import { Promocion } from "./Promocion";

export interface ConsultaPromocion {
  data: ConsultaPromo[];
  count: number;
}

interface ConsultaPromo {
  promocion: Promocion;
}
