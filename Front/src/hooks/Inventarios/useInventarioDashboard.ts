import { useState } from "react";
import { getElementosByInventario } from "@/axios/Elementos/getElementosByInventario";
import { venderElemento } from "@/axios/Elementos/venderElemento";
import { Elemento } from "@/types/Elemento";

export const useInventarioDashboard = () => {
    const [elementos, setElementos] = useState<Elemento[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchElementos = async (
        idInventario: number,
        filtros?: {
            nombre?: string;
            categoria?: number;
            caracteristica?: number;
        }
    ) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getElementosByInventario(idInventario, filtros);
            setElementos(data);
        } catch (err) {
            setError("Error al cargar elementos");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const vender = async (idElemento: number, cantidad: number = 1) => {
        try {
            await venderElemento(idElemento, cantidad);
            // Actualizar el stock localmente
            setElementos((prev) =>
                prev.map((el) =>
                    el.idElemento === idElemento
                        ? { ...el, stock: (el.stock || 0) - cantidad }
                        : el
                )
            );
            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.response?.data?.message || "Error al realizar venta" };
        }
    };

    return {
        elementos,
        loading,
        error,
        fetchElementos,
        vender,
    };
};
