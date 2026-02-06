

export type Movimiento = {
  idMovimiento?: number;
  descripcion?: string;
  cantidad?: number;
  horaIngreso?: string | null;
  horaSalida?: string | null;
  venta?: boolean;
  ingreso?: boolean;
  aceptado?: boolean;
  cancelado?: boolean;
  enProceso?: boolean;
  fechaDevolucion?: Date | string | null;
  createdAt?: string;
  updatedAt?: string;
  fkUsuario?: number | { idUsuario: number; nombre: string };
  fkTipoMovimiento?: number | { idTipo: number; nombre: string };
  fkInventario?: number | { idInventario: number; fkElemento?: { nombre: string } };
  fkSitio?: number;
  codigos?: string[];
};

export type MovimientoExtendido = Movimiento & {
  fkTipoMovimiento?: { nombre: string };
  fkUsuario?: { nombre: string };
  fkInventario?: {
    fkElemento?: { nombre: string };
  };
};