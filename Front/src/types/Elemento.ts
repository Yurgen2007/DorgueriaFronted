export type postElementos = {
  nombre: string;
  descripcion: string;
  estado: boolean;
  imagen?: string | File | undefined;
  fkUnidadMedida: number;
  fkCategoria: number;
  fkCaracteristica?: number | null;
  fechaVencimiento?: string | null | undefined;
  fkSitio: number;
  fkInventario: number;
  stock?: number;
};

export type putElementos = {
  idElemento?: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  imagen?: string | File | undefined;
  fkUnidadMedida: number;
  fkCategoria: number;
  fkCaracteristica?: number | null;
  fechaVencimiento?: string | null;
  fkSitio: number;
  fkInventario: number;
  stock?: number;
};

export type Elemento = {
  idElemento?: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  imagen?: string;
  fkUnidadMedida: any;
  fkCategoria: any;
  fkCaracteristica?: any | null;
  fechaVencimiento?: string | null;
  stock: number;
  fkSitio: {
    idSitio?: number;
    nombre: string | null;
    estante: string | null;
    pasillo: string | null;
  } | any;
  fkInventario: any;
  createdAt?: string;
  updatedAt?: string;
};
