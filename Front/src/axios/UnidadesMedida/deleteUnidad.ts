import { axiosAPI } from "../axiosAPI";

export async function deleteUnidad(idUnidad: number): Promise<any> {
  await axiosAPI.patch(`unidades-medida/state/${idUnidad}`);

  return idUnidad;
}
