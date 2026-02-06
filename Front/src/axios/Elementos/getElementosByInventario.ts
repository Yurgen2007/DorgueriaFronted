import { axiosInstance } from "../axiosAPI";

export const getElementosByInventario = async (
    idInventario: number,
    filtros?: {
        nombre?: string;
        categoria?: number;
        caracteristica?: number;
    }
) => {
    const params = new URLSearchParams();

    if (filtros?.nombre) params.append('nombre', filtros.nombre);
    if (filtros?.categoria) params.append('categoria', filtros.categoria.toString());
    if (filtros?.caracteristica) params.append('caracteristica', filtros.caracteristica.toString());

    const response = await axiosInstance.get(
        `/elementos/inventario/${idInventario}?${params.toString()}`
    );
    return response.data;
};
