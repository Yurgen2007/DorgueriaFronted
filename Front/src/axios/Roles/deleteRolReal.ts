import { axiosAPI } from "../axiosAPI";

export async function deleteRolReal(idRol: number): Promise<any> {
  await axiosAPI.delete(`roles/${idRol}`);

  return idRol;
}
