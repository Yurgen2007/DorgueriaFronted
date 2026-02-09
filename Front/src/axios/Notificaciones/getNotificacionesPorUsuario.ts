import { axiosAPI } from "../axiosAPI";

export async function getNotificacionesPorUsuario(idUsuario: number) {
  const res = await axiosAPI.get(`/notificaciones/usuario/${idUsuario}`);

  return res.data;
}
