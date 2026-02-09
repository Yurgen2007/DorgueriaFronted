import { axiosAPI } from "../axiosAPI";

import { UpCategoria } from "@/types/Categorias";

export async function UpdCategoria(
  idCategoria: number,
  data: UpCategoria,
): Promise<any> {
  const response = await axiosAPI.patch(
    `categorias/update/${idCategoria}`,
    data,
  );

  return response.data;
}
