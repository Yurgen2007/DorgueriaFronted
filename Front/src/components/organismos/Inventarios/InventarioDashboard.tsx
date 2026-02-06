import React, { useState, useEffect } from "react";
import { useInventarioDashboard } from "@/hooks/Inventarios/useInventarioDashboard";
import { Card, CardBody, Input } from "@heroui/react";
import { DetalleElemento } from "@/components/organismos/Elementos/DetalleElemento";
import { Elemento } from "@/types/Elemento";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const InventarioDashboard = () => {
    const { elementos, loading, fetchElementos, vender } = useInventarioDashboard();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedElemento, setSelectedElemento] = useState<Elemento | null>(null);

    useEffect(() => {
        fetchElementos(1, {
            nombre: searchTerm || undefined,
        });
    }, [searchTerm]);

    const handleVender = async (idElemento: number, cantidad: number) => {
        const result = await vender(idElemento, cantidad);
        if (result.success) {
            fetchElementos(1, {
                nombre: searchTerm || undefined,
            });
        }
        return result;
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardBody>
                    <h2 className="text-2xl font-bold mb-4">Dashboard de Inventario</h2>

                    {/* Buscador de Elementos */}
                    <Input
                        label="Buscar Elemento"
                        placeholder="Nombre del elemento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        startContent={<MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />}
                    />
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <h3 className="text-xl font-semibold mb-4">Elementos del Inventario</h3>

                    {loading ? (
                        <p>Cargando elementos...</p>
                    ) : elementos.length === 0 ? (
                        <p className="text-gray-500">No hay elementos en este inventario</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-3">Nombre</th>
                                        <th className="text-left p-3">Categoría</th>
                                        <th className="text-left p-3">Stock</th>
                                        <th className="text-left p-3">Ubicación</th>
                                        <th className="text-left p-3">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elementos.map((elemento) => (
                                        <tr
                                            key={elemento.idElemento}
                                            onClick={() => setSelectedElemento(elemento)}
                                            className="border-b hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer transition"
                                        >
                                            <td className="p-3">{elemento.nombre}</td>
                                            <td className="p-3">{elemento.fkCategoria?.nombre || "N/A"}</td>
                                            <td className="p-3">
                                                <span className={`font-semibold ${(elemento.stock || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {elemento.stock || 0}
                                                </span>
                                            </td>
                                            <td className="p-3">{elemento.fkSitio?.nombre || "N/A"}</td>
                                            <td className="p-3">
                                                <span className={elemento.estado ? "text-green-600" : "text-red-600"}>
                                                    {elemento.estado ? "Activo" : "Inactivo"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* Panel de Detalle */}
            {selectedElemento && (
                <DetalleElemento
                    elemento={selectedElemento}
                    onClose={() => setSelectedElemento(null)}
                    onVender={handleVender}
                />
            )}
        </div>
    );
};
