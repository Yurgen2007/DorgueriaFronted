import { axiosAPI } from "../axiosAPI";

export interface UnidadPutData {
  nombre: string;
}

export async function putUnidad(
  idUnidad: number,
  data: UnidadPutData,
): Promise<any> {
  const res = await axiosAPI.patch(`unidades-medida/${idUnidad}`, data);

  return res.data;
}
