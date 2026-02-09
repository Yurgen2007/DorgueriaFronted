import { axiosAPI } from "../axiosAPI";

export async function patchFotoPerfil(file: File): Promise<any> {
  const formData = new FormData();

  formData.append("perfil", file);
  const response = await axiosAPI.patch(`usuarios/updatefoto`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
