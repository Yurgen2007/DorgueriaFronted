import { axiosAPI } from "../axiosAPI";

export interface PermisoPostData {
  idPermiso?: number;
  permiso: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function postPermiso(data: PermisoPostData): Promise<any> {
  const res = await axiosAPI.post(`permisos`, data);

  return res.data;
}
