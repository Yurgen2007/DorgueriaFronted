import { axiosAPI } from "../axiosAPI";

export interface PermisoPutData {
  idPermiso?: number;
  permiso: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function putPermiso(
  id: number,
  data: PermisoPutData,
): Promise<any> {
  const res = await axiosAPI.patch(`permisos/${id}`, data);

  return res.data;
}
