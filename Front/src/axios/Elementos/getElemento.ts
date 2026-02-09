import { axiosAPI } from "../axiosAPI";

import { Elemento } from "@/types/Elemento";

export const getElemento = async (): Promise<Elemento[]> => {
  const res = await axiosAPI.get("elementos");

  return res.data;
};
