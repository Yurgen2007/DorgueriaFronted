import { axiosAPI } from "../axiosAPI";

import { InventarioConSitio } from "@/types/Inventario";

export const getInventario = async (): Promise<InventarioConSitio[]> => {
  const res = await axiosAPI.get(`inventarios`);

  return res.data;
};
