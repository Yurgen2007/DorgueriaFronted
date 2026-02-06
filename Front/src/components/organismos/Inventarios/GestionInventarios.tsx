import { useInventario } from "@/hooks/Inventarios/useInventario";
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, addToast } from "@heroui/react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "../modal";
import FormInventario from "./FormInventario";
import Buton from "@/components/molecules/Button";
import { InventarioCreate } from "@/schemas/Inventario";

export const GestionInventarios = () => {
    const { inventarios = [], addInventario, changeState, removeInventario, isLoading } = useInventario();
    const [showModalCreate, setShowModalCreate] = useState(false);

    const handleCreate = async (data: InventarioCreate) => {
        try {
            await addInventario({
                nombre: data.nombre,
                estado: true,
            });
            setShowModalCreate(false);
            addToast({
                title: "Inventario Creado",
                description: "El inventario se ha creado correctamente",
                color: "success",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            });
        } catch (error) {
            console.error("Error al crear el inventario:", error);
            addToast({
                title: "Error",
                description: "No se pudo crear el inventario",
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            });
        }
    };

    const handleChangeState = async (idInventario: number) => {
        try {
            await changeState(idInventario);
            addToast({
                title: "Estado cambiado con exito",
                color: "primary",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            });
        } catch (error) {
            console.error("Error al cambiar estado del inventario:", error);
            addToast({
                title: "Error",
                description: "No se pudo actualizar el inventario",
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            });
        }
    };

    const handleDelete = async (idInventario: number) => {
        try {
            await removeInventario(idInventario);
            addToast({
                title: "Inventario Eliminado",
                description: "El inventario ha sido eliminado permanentemente",
                color: "success",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            });
        } catch (error) {
            console.error("Error al eliminar el inventario:", error);
            addToast({
                title: "Error",
                description: "No se pudo eliminar el inventario",
                color: "danger",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
            });
        }
    };

    if (isLoading) {
        return <p className="text-center mt-10">Cargando inventarios...</p>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestión de Inventarios</h2>
                <Buton 
                    color="primary" 
                    onPress={() => setShowModalCreate(true)}
                    startContent={<PlusIcon className="w-5 h-5" />}
                >
                    Nuevo Inventario
                </Buton>
            </div>

            <Card>
                <CardBody>
                    <Table className="text-center">
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>NOMBRE</TableColumn>
                            <TableColumn>ESTADO</TableColumn>
                            <TableColumn>ACCIONES</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {inventarios.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8">
                                        No hay inventarios registrados
                                    </TableCell>
                                </TableRow>
                            ) : (
                                inventarios.map((inv) => (
                                    <TableRow key={inv.idInventario}>
                                        <TableCell>{inv.idInventario}</TableCell>
                                        <TableCell>{inv.nombre}</TableCell>
                                        <TableCell>
                                            <span className={inv.estado ? "text-green-600" : "text-red-600"}>
                                                {inv.estado ? "Activo" : "Inactivo"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    color="warning"
                                                    variant="flat"
                                                    startContent={<PencilIcon className="w-4 h-4" />}
                                                    onPress={() => {
                                                        if (inv.idInventario) {
                                                            handleChangeState(inv.idInventario);
                                                        }
                                                    }}
                                                >
                                                    {inv.estado ? "Desactivar" : "Activar"}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    color="danger"
                                                    variant="flat"
                                                    startContent={<TrashIcon className="w-4 h-4" />}
                                                    onPress={() => {
                                                        if (inv.idInventario) {
                                                            handleDelete(inv.idInventario);
                                                        }
                                                    }}
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>

            {/* Modal para crear inventario */}
            <Modal 
                ModalTitle="Crear Nuevo Inventario" 
                isOpen={showModalCreate} 
                onOpenChange={() => setShowModalCreate(false)}
            >
                <FormInventario 
                    id="inventario" 
                    onClose={() => setShowModalCreate(false)} 
                />
                <div className="flex justify-end gap-2 mt-4">
                    <Buton 
                        variant="bordered" 
                        onPress={() => setShowModalCreate(false)}
                    >
                        Cancelar
                    </Buton>
                    <Buton 
                        form="inventario" 
                        type="submit" 
                        color="primary"
                    >
                        Crear Inventario
                    </Buton>
                </div>
            </Modal>
        </div>
    );
};
