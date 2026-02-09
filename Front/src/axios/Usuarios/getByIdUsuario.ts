import { axiosAPI } from "../axiosAPI";

import { User } from "@/types/Usuario";

export const getByIdUsuario = async (idUsuario: number): Promise<User> => {
  const response = await axiosAPI.get(`/usuarios/${idUsuario}`);

  return response.data;
};
