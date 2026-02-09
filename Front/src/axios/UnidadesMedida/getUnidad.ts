import { axiosAPI } from "../axiosAPI";

import { Unidad } from "@/types/Unidad";

export const getUnidad = async (): Promise<Unidad[]> => {
  const res = await axiosAPI.get(`unidades-medida`);

  return res.data;
};
