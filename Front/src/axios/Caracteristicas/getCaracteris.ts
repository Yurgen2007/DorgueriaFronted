import { axiosAPI } from "../axiosAPI";

import { Caracteristica } from "@/types/Caracteristica";

export const getCaracteristicas = async (): Promise<Caracteristica[]> => {
  const response = await axiosAPI.get("caracteristicas");

  return response.data;
};
