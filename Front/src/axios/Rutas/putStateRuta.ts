import { axiosAPI } from "../axiosAPI";

export const StateRuta = async (idRuta: number): Promise<any> => {
  const response = await axiosAPI.patch(`/rutas/state/${idRuta}`);

  return response.data;
};
