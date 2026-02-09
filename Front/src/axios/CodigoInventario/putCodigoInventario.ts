import { axiosAPI } from "../axiosAPI";

export interface CodigoInventarioPutData {
  codigo?: string;
}

export async function putCodigoInventario(
  idCodigoInventario: number,
  data: CodigoInventarioPutData,
): Promise<any> {
  const res = await axiosAPI.patch(
    `codigo-inventario/${idCodigoInventario}`,
    data,
  );

  return res.data;
}
