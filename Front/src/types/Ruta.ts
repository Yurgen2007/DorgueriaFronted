export type Ruta = {
  idRuta: number;
  nombre: string;
  descripcion: string;
  urlDestino: string;
  estado: boolean;
  createdAt?: string;
  updatedAt?: string;
  fkModulo: number;
};

export type UpRuta = {
  idRuta: number;
  nombre: string;
  descripcion: string;
  urlDestino: string;
};
