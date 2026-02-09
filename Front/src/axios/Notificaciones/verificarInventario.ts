import axiosAPI from "../axiosAPI";

export const verificarInventario = async (idUsuario: number) => {
  try {
    const response = await axiosAPI.get(`/notificaciones/verificar-inventario/${idUsuario}`);
    return response.data;
  } catch (error) {
    console.error('Error al verificar inventario:', error);
    throw error;
  }
};
