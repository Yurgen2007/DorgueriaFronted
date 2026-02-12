import { axiosAPI } from "../axiosAPI";

export interface MailConfigData {
  serviceMail: string;
  mailUser: string;
  mailPassword: string;
}

export async function getMailConfig(): Promise<any> {
  try {
    const response = await axiosAPI.get("auth/mail-config");
    return response.data;
  } catch (error) {
    console.error("Error al obtener configuración de correo:", error);
    throw error;
  }
}

export async function putMailConfig(data: MailConfigData): Promise<any> {
  try {
    const response = await axiosAPI.patch("auth/mail-config", data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar configuración de correo:", error);
    throw error;
  }
}
