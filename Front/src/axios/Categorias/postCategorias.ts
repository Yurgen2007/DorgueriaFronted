import { axiosAPI } from "../axiosAPI";

import { Categoria } from "@/types/Categorias";

export async function postCategorias(data: Categoria): Promise<any> {
  const response = await axiosAPI.post("categorias/", data);

  return response.data;
}
