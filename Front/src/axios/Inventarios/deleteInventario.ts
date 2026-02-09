import { axiosAPI } from "../axiosAPI";

export async function deleteInventario(idInventario: number): Promise<any> {
  await axiosAPI.patch(`inventarios/state/${idInventario}`);

  return idInventario;
}
