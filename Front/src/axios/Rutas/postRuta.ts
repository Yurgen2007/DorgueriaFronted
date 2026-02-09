import { axiosAPI } from "../axiosAPI";

import { Ruta } from "@/types/Ruta";

export async function postRuta(data: Ruta): Promise<any> {
  const response = await axiosAPI.post("rutas/", data);

  return response.data;
}
