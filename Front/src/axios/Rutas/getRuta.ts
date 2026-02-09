import { axiosAPI } from "../axiosAPI";

import { Ruta } from "@/types/Ruta";

export const getRuta = async (): Promise<Ruta[]> => {
  const response = await axiosAPI.get("/rutas/");

  return response.data;
};
