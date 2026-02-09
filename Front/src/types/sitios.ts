export type Sitios = {
  idSitio?: number;
  nombre: string;
  estante?: string;
  pasillo?: string;
  estado?: boolean; // Note: Entity doesn't show 'estado', but many components use it. I'll check if it's needed or if it was removed.
  createdAt?: string;
  updatedAt?: string;
};

export type ListarSitios = Sitios;
