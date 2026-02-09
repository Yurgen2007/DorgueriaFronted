export type RolPermiso = {
  idRolPermiso: number;
  estado: boolean;
  createdAt: string;
  updatedAt: string;
  fkPermiso: {
    idPermiso: number;
    permiso: string;
  };
  fkRol: {
    idRol: number;
    nombre: string;
  };
};
export type RolPermisoPost = {
  idRolPermiso?: number;
  estado: boolean;
  createdAt?: string;
  updatedAt?: string;
  fkPermiso: number;
  fkRol: number;
};
