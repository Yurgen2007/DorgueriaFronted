import { axiosAPI } from "../axiosAPI";

export interface InventarioPostData {
    nombre: string;
    estado?: boolean;
}

export async function postInventario(data:InventarioPostData):Promise<any> {
    const res = await axiosAPI.post(`inventarios`, data);
    return res.data;
}
