import { axiosAPI } from "../axiosAPI";

import { Caracteristica } from "@/types/Caracteristica";

export async function postCaracteristica(data: Caracteristica): Promise<any> {
  const response = await axiosAPI.post("caracteristicas", data);

  return response.data;
}
