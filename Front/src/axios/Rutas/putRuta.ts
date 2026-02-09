import { axiosAPI } from "../axiosAPI";

import { UpRuta } from "@/types/Ruta";

export async function putRuta(idRuta: number, data: UpRuta): Promise<any> {
  const response = await axiosAPI.patch(`rutas/${idRuta}/`, data);

  return response.data;
}
