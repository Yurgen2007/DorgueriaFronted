import { axiosAPI } from "../axiosAPI";

import { Categoria } from "@/types/Categorias";

export const getCategorias = async (): Promise<Categoria[]> => {
  const response = await axiosAPI.get("/categorias/");

  return response.data;
};
