import { axiosAPI } from "../axiosAPI";

export async function deleteCategoriaReal(idCategoria: number): Promise<any> {
  await axiosAPI.delete(`categorias/${idCategoria}`);
  return idCategoria;
}
