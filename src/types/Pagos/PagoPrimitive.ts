export interface PagoPrimitive {
  id: number;
  monto: number;
  fecha_pago: string;
  fecha_vencimiento: string;
  membresia_id: number;
  membresia_nombre: string | null;
  promocion_id: number;
  promocion_nombre: string | null;
  cliente_nombre: string;
}