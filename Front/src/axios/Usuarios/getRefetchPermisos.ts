import { axiosAPI } from "../axiosAPI";

export const getRefetchPermisos = async (): Promise<any[]> => {
  try {
    const response = await axiosAPI.get("/auth/refetch");

    return response.data.modules;
  } catch (error) {
    return [];
  }
};
