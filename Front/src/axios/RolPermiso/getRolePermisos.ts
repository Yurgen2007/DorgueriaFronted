import { axiosAPI } from "../axiosAPI";

export const getRolePermisos = async (rol: number) => {
  const { data } = await axiosAPI.get(`rol-permiso/rol/${rol}/permisos`);

  return data;
};
