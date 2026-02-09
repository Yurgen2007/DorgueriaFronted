import { axiosAPI } from "../axiosAPI";

export async function postMassiveUsuarios(data: FormData): Promise<any> {
  const response = await axiosAPI.post("usuarios/massive", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
