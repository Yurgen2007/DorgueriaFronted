import { axiosAPI } from "../axiosAPI";

import { Perfil } from "@/schemas/User";

export async function patchPerfil(data: Perfil): Promise<any> {
  const response = await axiosAPI.patch("usuarios/perfil", data);

  return response.data;
}
