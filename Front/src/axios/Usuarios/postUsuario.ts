import { axiosAPI } from "../axiosAPI";

import { postUser } from "@/types/Usuario";

export async function postUsuarios(data: postUser): Promise<any> {
  const response = await axiosAPI.post("usuarios", data);

  return response.data;
}
