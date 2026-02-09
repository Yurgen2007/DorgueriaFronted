import { axiosAPI } from "../axiosAPI";

import { Permisos } from "@/types/permisos";

export const getPermiso = async (): Promise<Permisos[]> => {
  const res = await axiosAPI.get(`permisos`);

  return res.data;
};
