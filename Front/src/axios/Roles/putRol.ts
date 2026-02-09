import { axiosAPI } from "../axiosAPI";

export interface RolPutData {
  nombre: string;
}

export async function putRol(id: number, data: RolPutData): Promise<any> {
  const res = await axiosAPI.patch(`roles/${id}`, data);

  return res.data;
}
