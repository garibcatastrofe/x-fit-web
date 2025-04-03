import { Membresia } from "./Membresia";

export interface ConsultaMembresia {
  data: ConsultaMem[];
  count: number;
}

interface ConsultaMem {
  membresia: Membresia;
}
