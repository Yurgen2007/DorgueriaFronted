import { axiosAPI } from "../axiosAPI";

export interface RolPostData {
  idRol?: number;
  nombre: string;
  estado?: boolean;
}

export async function postRol(data: RolPostData): Promise<any> {
  const { idRol, ...resto } = data;
  const res = await axiosAPI.post("roles", resto);

  return res.data;
}
