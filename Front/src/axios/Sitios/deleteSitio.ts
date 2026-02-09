import { axiosAPI } from "../axiosAPI";

export async function deleteSitio(idSitio: number): Promise<any> {
  await axiosAPI.patch(`sitios/state/${idSitio}`);

  return idSitio;
}
