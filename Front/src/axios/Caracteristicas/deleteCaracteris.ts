import axios from "axios";

export const deleteCaracteristica = async (id: number) => {
  const response = await axios.delete(`/caracteristicas/${id}`);
  return response.data;
};
