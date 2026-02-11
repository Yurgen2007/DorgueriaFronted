import { axiosAPI } from "../axiosAPI";

export async function deleteUnidadReal(idUnidad: number): Promise<any> {
  await axiosAPI.delete(`unidades-medida/${idUnidad}`);

  return idUnidad;
}
