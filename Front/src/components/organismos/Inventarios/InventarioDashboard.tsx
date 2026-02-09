import React, { useState, useEffect } from "react";
import { Card, CardBody, Input } from "@heroui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useInventarioDashboard } from "@/hooks/Inventarios/useInventarioDashboard";
import { DetalleElemento } from "@/components/organismos/Elementos/DetalleElemento";
import { Elemento } from "@/types/Elemento";
import { formatDateColombia } from "@/utils/dateUtils";

export const InventarioDashboard = () => {
  const { elementos, loading, fetchElementos, vender } =
    useInventarioDashboard();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedElemento, setSelectedElemento] = useState<Elemento | null>(
    null,
  );

  // Función para calcular días faltantes para vencer
  const diasFaltantes = (fechaVencimiento: string | Date | null | undefined): number | null => {
    if (!fechaVencimiento) return null;
    const fecha = new Date(fechaVencimiento);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const diferencia = Math.ceil((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    return diferencia;
  };

  // Función para obtener color según días faltantes
  const getColorEstado = (dias: number | null): string => {
    if (dias === null) return "text-gray-500";
    if (dias < 0) return "text-red-700 font-bold"; // Vencido
    if (dias <= 7) return "text-red-600 font-bold"; // Crítico (vence en 7 días)
    if (dias <= 30) return "text-yellow-600"; // Próximo a vencer (30 días)
    return "text-primary"; // Normal
  };

  // Función para obtener etiqueta de estado
  const getEtiquetaEstado = (dias: number | null): string => {
    if (dias === null) return "Sin fecha";
    if (dias < 0) return `Vencido hace ${Math.abs(dias)} días`;
    if (dias === 0) return "Vence hoy";
    return `Vence en ${dias} días`;
  };

  // Ordenar elementos por fecha de vencimiento (más próximos primero)
  const elementosOrdenados = [...(elementos || [])].sort((a, b) => {
    const diasA = diasFaltantes(a.fechaVencimiento);
    const diasB = diasFaltantes(b.fechaVencimiento);
    
    if (diasA === null && diasB === null) return 0;
    if (diasA === null) return 1;
    if (diasB === null) return -1;
    return diasA - diasB;
  });

  useEffect(() => {
    fetchElementos(1, {
      codigoBarras: searchTerm || undefined,
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
            startContent={
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <h3 className="text-xl font-semibold mb-4">
            Elementos del Inventario
          </h3>

          {loading ? (
            <p>Cargando elementos...</p>
          ) : elementos.length === 0 ? (
            <p className="text-gray-500">No hay elementos en este inventario</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b bg-gray-100 dark:bg-zinc-700">
                    <th className="text-left p-3">Nombre</th>
                    <th className="text-left p-3">Código de barras</th>
                    <th className="text-left p-3">Categoría</th>
                    <th className="text-left p-3">Stock</th>
                    <th className="text-left p-3">Ubicación</th>
                    <th className="text-left p-3">Vencimiento</th>
                    <th className="text-left p-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {elementosOrdenados.map((elemento) => {
                    const dias = diasFaltantes(elemento.fechaVencimiento);
                    return (
                      <tr
                        key={elemento.idElemento}
                        className="border-b hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer transition"
                        onClick={() => setSelectedElemento(elemento)}
                      >
                        <td className="p-3 font-semibold">{elemento.nombre}</td>
                        <td className="p-3">{elemento.codigoBarras ?? "-"}</td>
                        <td className="p-3">
                          {elemento.fkCategoria?.nombre || "N/A"}
                        </td>
                        <td className="p-3">
                          <span
                            className={`font-semibold ${(elemento.stock || 0) > 0 ? "text-primary" : "text-red-600"}`}
                          >
                            {elemento.stock || 0}
                          </span>
                        </td>
                        <td className="p-3">
                          {elemento.fkSitio?.nombre || "N/A"}
                        </td>
                        <td className="p-3">
                          <span className={getColorEstado(dias)}>
                            {elemento.fechaVencimiento
                              ? formatDateColombia(elemento.fechaVencimiento)
                              : "Sin fecha"}
                          </span>
                        </td>
                        <td className={`p-3 font-semibold ${getColorEstado(dias)}`}>
                          {getEtiquetaEstado(dias)}
                        </td>
                      </tr>
                    );
                  })}
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
