export interface PagosClientes {
  id: number;
  cliente_id: number;
  pago_id: number;
  usuario_id: number | null;
  nombres: string | null;
  apellidos: string | null;
}