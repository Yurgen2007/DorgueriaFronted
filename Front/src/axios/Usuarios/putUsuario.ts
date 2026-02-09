import { axiosAPI } from "../axiosAPI";

import { putUser } from "@/types/Usuario";

export async function updateUsuario(
  idUsuario: number,
  data: putUser,
): Promise<any> {
  const response = await axiosAPI.patch(`usuarios/update/${idUsuario}`, data);

  return response.data;
}
