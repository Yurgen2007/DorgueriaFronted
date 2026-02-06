import { axiosAPI } from "../axiosAPI";

export async function deleteElemento(idElemento:number):Promise<any> {
    const response = await axiosAPI.delete(`elementos/${idElemento}`);
    return response.data;
}