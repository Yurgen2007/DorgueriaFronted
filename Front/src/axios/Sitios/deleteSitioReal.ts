import { axiosAPI } from "../axiosAPI";

export async function deleteSitioReal(idSitio: number): Promise<any> {
  await axiosAPI.delete(`sitios/${idSitio}`);
  return idSitio;
}
