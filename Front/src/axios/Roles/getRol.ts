import { axiosAPI } from "../axiosAPI";

import { Rol } from "@/types/Rol";

export const getRol = async (): Promise<Rol[]> => {
  const res = await axiosAPI.get("roles");

  return res.data;
};
