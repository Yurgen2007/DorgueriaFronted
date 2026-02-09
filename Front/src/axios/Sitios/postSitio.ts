import { axiosAPI } from "../axiosAPI";

export interface SitioPostData {
  idSitio?: number;
  nombre: string;
  estante?: string;
  pasillo?: string;
}

export async function postSitio(data: SitioPostData): Promise<any> {
  const res = await axiosAPI.post(`sitios`, data);

  return res.data;
}
