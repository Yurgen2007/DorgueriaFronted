import { axiosAPI } from "../axiosAPI";

import { Modulo } from "@/types/Modulo";

export const getModulo = async (): Promise<Modulo[]> => {
  const response = await axiosAPI.get("modulos");

  return response.data;
};
