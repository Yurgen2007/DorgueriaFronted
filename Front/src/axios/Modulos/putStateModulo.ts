import { axiosAPI } from "../axiosAPI";

export const StateModulo = async (idModulo: number): Promise<any> => {
  const response = await axiosAPI.patch(`modulos/estado/${idModulo}`);

  return response.data;
};
