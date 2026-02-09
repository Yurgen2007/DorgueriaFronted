import { axiosAPI } from "../axiosAPI";

import { Modulo } from "@/types/Modulo";

export async function postModulo(data: Modulo): Promise<any> {
  const response = await axiosAPI.post("modulos", data);

  return response.data;
}
