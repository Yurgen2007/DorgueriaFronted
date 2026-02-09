import { axiosAPI } from "../axiosAPI";

import { Perfil } from "@/types/Usuario";

export const getPerfil = async (): Promise<Perfil> => {
  const response = await axiosAPI.get("usuarios/perfil");

  return response.data.usuario;
};
