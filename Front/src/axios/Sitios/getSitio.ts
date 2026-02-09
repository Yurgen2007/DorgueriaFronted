import { axiosAPI } from "../axiosAPI";

import { ListarSitios } from "@/types/sitios";

export const getSitio = async (): Promise<ListarSitios[]> => {
  const res = await axiosAPI.get(`sitios`);

  return res.data;
};
