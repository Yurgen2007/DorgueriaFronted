export type Modulo = {
  idModulo: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type UpModulo = {
  idModulo: number;
  nombre: string;
  descripcion: string;
};
