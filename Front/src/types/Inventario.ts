export type CodigoInventario = {
  fkMovimiento: number
  idCodigoInventario: number;
  codigo: string;
  uso: boolean
};

export type Inventario = {
  idInventario?: number;
  nombre: string;
  estado?: boolean;
  createdAt?: string;
  updatedAt?: string;
  fkSitio?: any; // Can be a number (ID) or an object
  fkElemento?: any; // Can be a number (ID) or an object
  codigos?: CodigoInventario[];
  tieneCaracteristicas?: boolean;
  acciones?: any;
  imagenElemento?: any;
  unidad?: any;
};

export type InventarioConSitio = Inventario & {
  fkSitio: {
    idSitio: number;
    nombre: string;
  };
  fkElemento: {
    idElemento: number;
    nombre: string;
    imagen?: string;
    fkUnidadMedida?: {
      idUnidad: number;
      nombre: string;
    };
    fkCaracteristica?: any;
  };
};

export type InventarioConElemento = Inventario & {
  fkSitio: {
    idSitio: number;
    nombre: string;
  };
  fkElemento: {
    idElemento: number;
    nombre: string;
    imagen?: string;
    fkUnidadMedida?: {
      idUnidad: number;
      nombre: string;
    };
    fkCaracteristica?: any;
  };
};
