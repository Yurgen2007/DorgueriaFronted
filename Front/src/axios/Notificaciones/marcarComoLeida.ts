import { axiosAPI } from "../axiosAPI";

export async function marcarComoLeida(idNotificacion: number) {
  const res = await axiosAPI.patch(`/notificaciones/${idNotificacion}/leida`);

  return res.data;
}
