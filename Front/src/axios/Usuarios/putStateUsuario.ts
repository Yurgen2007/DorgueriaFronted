import { axiosAPI } from "../axiosAPI";

export const StateUsuario = async (idUsuario: number): Promise<any> => {
  await axiosAPI.patch(`usuarios/estado/${idUsuario}`);

  return idUsuario;
};
