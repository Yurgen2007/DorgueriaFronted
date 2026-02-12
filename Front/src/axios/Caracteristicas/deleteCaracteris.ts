import axiosAPI from "../axiosAPI";

export const deleteCaracteristica = async (id: number) => {
  const response = await axiosAPI.delete(`/caracteristicas/${id}`);
  return response.data;
};
