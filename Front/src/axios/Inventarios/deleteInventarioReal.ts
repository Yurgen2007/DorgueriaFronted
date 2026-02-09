import { axiosAPI } from "../axiosAPI";

export async function deleteInventarioReal(
  idInventario: number,
): Promise<void> {
  await axiosAPI.delete(`inventarios/${idInventario}`);
}
