import { Elemento } from "@/types/Elemento";
import { Card, CardBody, Button, addToast, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type DetalleElementoProps = {
    elemento: Elemento | null;
    onClose: () => void;
    onVender: (idElemento: number, cantidad: number) => Promise<{ success: boolean; error?: string }>;
};

export const DetalleElemento = ({ elemento, onClose, onVender }: DetalleElementoProps) => {
    if (!elemento) return null;

    const { isOpen, onOpen, onClose: onModalClose } = useDisclosure();
    const [cantidad, setCantidad] = useState<number>(1);

    const handleVenta = async () => {
        if (!elemento.idElemento) return;

        if ((elemento.stock || 0) <= 0) {
            addToast({
                title: "Stock insuficiente",
                description: "No hay stock disponible para vender",
                color: "danger",
                timeout: 3000,
            });
            return;
        }

        onOpen();
    };

    const confirmarVenta = async () => {
        if (!elemento.idElemento) return;
        
        if (cantidad <= 0) {
            addToast({
                title: "Cantidad inválida",
                description: "La cantidad debe ser mayor a 0",
                color: "danger",
                timeout: 3000,
            });
            return;
        }

        if (cantidad > (elemento.stock || 0)) {
            addToast({
                title: "Stock insuficiente",
                description: `Solo hay ${elemento.stock} unidades disponibles`,
                color: "danger",
                timeout: 3000,
            });
            return;
        }

        const result = await onVender(elemento.idElemento, cantidad);

        if (result.success) {
            addToast({
                title: "Venta exitosa",
                description: `Se han descontado ${cantidad} unidades del stock`,
                color: "success",
                timeout: 3000,
            });
            onModalClose();
            setCantidad(1);
        } else {
            addToast({
                title: "Error en venta",
                description: result.error || "No se pudo realizar la venta",
                color: "danger",
                timeout: 3000,
            });
        }
    };

    return (
        <>
        <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-zinc-900 shadow-2xl z-50 overflow-y-auto border-l border-gray-200 dark:border-zinc-700">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Detalle del Elemento</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Imagen */}
                <div className="mb-6">
                    <img
                        src={`${import.meta.env.VITE_API_CLIENT?.replace(/\/$/, '') || 'http://localhost:3000'}/img/elementos/${elemento.imagen || 'defaultElemento.png'}`}
                        alt={elemento.nombre}
                        className="w-full h-64 object-cover rounded-lg"
                        onError={(e) => {
                            // Si falla, intentar con la imagen por defecto
                            e.currentTarget.src = `${import.meta.env.VITE_API_CLIENT?.replace(/\/$/, '') || 'http://localhost:3000'}/img/elementos/defaultElemento.png`;
                        }}
                    />
                </div>

                {/* Información */}
                <div className="space-y-4">
                    <Card>
                        <CardBody>
                            <h3 className="font-semibold text-lg mb-2">{elemento.nombre}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {elemento.descripcion || "Sin descripción"}
                            </p>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium">Stock:</span>
                                <span className={`font-bold ${(elemento.stock || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {elemento.stock || 0} unidades
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium">Categoría:</span>
                                <span>{elemento.fkCategoria?.nombre || "N/A"}</span>
                            </div>

                            {elemento.fkCaracteristica && (
                                <div className="flex justify-between">
                                    <span className="font-medium">Característica:</span>
                                    <span>{elemento.fkCaracteristica?.nombre || "N/A"}</span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span className="font-medium">Unidad:</span>
                                <span>{elemento.fkUnidadMedida?.nombre || "N/A"}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium">Inventario:</span>
                                <span>{elemento.fkInventario?.nombre || "N/A"}</span>
                            </div>

                            {elemento.fkSitio && (
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Ubicación:</span>
                                        <span>{elemento.fkSitio.nombre || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Pasillo:</span>
                                        <span>{elemento.fkSitio.pasillo || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Estante:</span>
                                        <span>{elemento.fkSitio.estante || 'N/A'}</span>
                                    </div>
                                </div>
                            )}

                            {elemento.fechaVencimiento && (
                                <div className="flex justify-between">
                                    <span className="font-medium">Vencimiento:</span>
                                    <span>{new Date(elemento.fechaVencimiento).toLocaleDateString()}</span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span className="font-medium">Estado:</span>
                                <span className={elemento.estado ? "text-green-600" : "text-red-600"}>
                                    {elemento.estado ? "Activo" : "Inactivo"}
                                </span>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Botón de Venta */}
                    <Button
                        color="primary"
                        size="lg"
                        className="w-full"
                        onClick={handleVenta}
                        isDisabled={(elemento.stock || 0) <= 0 || !elemento.estado}
                    >
                        🛒 Vender
                    </Button>
                </div>
            </div>
        </div>

        {/* Modal de cantidad */}
        <Modal isOpen={isOpen} onClose={onModalClose}>
            <ModalContent>
                <ModalHeader>Confirmar Venta</ModalHeader>
                <ModalBody>
                    <Input
                        type="number"
                        label="Cantidad"
                        value={cantidad.toString()}
                        onChange={(e) => setCantidad(parseInt(e.target.value) || 0)}
                        min={1}
                        max={elemento.stock || 1}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                        Stock disponible: {elemento.stock || 0} unidades
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onClick={onModalClose}>
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={confirmarVenta}>
                        Confirmar Venta
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
};
