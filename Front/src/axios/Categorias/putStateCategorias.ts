import { axiosAPI } from "../axiosAPI";

export const StateCategoria = async (idCategoria: number): Promise<any> => {
  const response = await axiosAPI.patch(`/categorias/estado/${idCategoria}`);

  return response.data;
};
