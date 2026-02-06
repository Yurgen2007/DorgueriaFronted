import { axiosInstance } from "../axiosAPI";

export const venderElemento = async (idElemento: number, cantidad: number = 1) => {
    const response = await axiosInstance.post(
        `/elementos/${idElemento}/vender`,
        { cantidad }
    );
    return response.data;
};
