import { axiosAPI } from "../axiosAPI";

export async function deleteRol(idRol: number): Promise<any> {
  await axiosAPI.patch(`roles/state/${idRol}`);

  return idRol;
}
