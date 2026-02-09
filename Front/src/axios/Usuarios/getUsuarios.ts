import { axiosAPI } from "../axiosAPI";

import { User } from "@/types/Usuario";

export const getUsuarios = async (): Promise<User[]> => {
  const response = await axiosAPI.get("/usuarios");

  return response.data;
};
