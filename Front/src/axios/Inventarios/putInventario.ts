import { axiosAPI } from "../axiosAPI";

export interface InventarioPutData {
  stock?: number;
}

export async function putInventario(
  idInventario: number,
  data: InventarioPutData,
): Promise<any> {
  const res = await axiosAPI.patch(`inventarios/${idInventario}`, data);

  return res.data;
}
