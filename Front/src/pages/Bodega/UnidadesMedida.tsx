import { useState } from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import Globaltable from "@/components/organismos/table.tsx"; // Importar la tabla reutilizable
import { TableColumn } from "@/components/organismos/table.tsx";
import Buton from "@/components/molecules/Button";
import Modall from "@/components/organismos/modal";
import { useUnidad } from "@/hooks/UnidadesMedida/useUnidad";
import { FormUpdate } from "@/components/organismos/UnidadesMedida/FormUpdate";
import { Unidad } from "@/types/Unidad";
import FormularioUnidades from "@/components/organismos/UnidadesMedida/FormRegister";

export const UnidadTable = () => {
  const { unidades, isLoading, isError, error, addUnidad, deleteReal } =
    useUnidad();

  //Modal agregar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  //Modal actualizar
  const [IsOpenUpdate, setIsOpenUpdate] = useState(false);
  const [selectedUnidad, setSelectedUnidad] = useState<Unidad | null>(null);

  const navigate = useNavigate();

  const handleGoToElemento = () => {
    navigate("/bodega/elementos");
  };

  const handleCloseUpdate = () => {
    setIsOpenUpdate(false);
    setSelectedUnidad(null);
  };

  const handleDelete = async (idUnidad: number) => {
    await deleteReal(idUnidad);
  };

  const handleAddUnidad = async (unidad: Unidad) => {
    try {
      await addUnidad(unidad);
      handleClose(); // Cerrar el modal después de darle agregar usuario
    } catch (error) {
      console.error("Error al agregar la unidad:", error);
    }
  };

  const handleEdit = (unidad: Unidad) => {
    if (!unidad || !unidad.idUnidad) {
      return;
    }
    setSelectedUnidad(unidad);
    setIsOpenUpdate(true);
  };

  // Definir las columnas de la tabla
  const columns: TableColumn<Unidad>[] = [
    { key: "nombre", label: "Nombre" },
    {
      key: "createdAt",
      label: "Fecha Creación",
      render: (unidad: Unidad) => (
        <span>
          {unidad.createdAt
            ? new Date(unidad.createdAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : "N/A"}
        </span>
      ),
    },
    {
      key: "updatedAt",
      label: "Fecha Actualización",
      render: (unidad: Unidad) => (
        <span>
          {unidad.updatedAt
            ? new Date(unidad.updatedAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : "N/A"}
        </span>
      ),
    },
    { key: "estado", label: "Estado" },
  ];

  if (isLoading) {
    return <span>Cargando datos...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const UnidadsWithKey = unidades
    ?.filter((unidad) => unidad?.idUnidad !== undefined)
    .map((unidad) => ({
      ...unidad,
      key: unidad.idUnidad ? unidad.idUnidad.toString() : crypto.randomUUID(),
      idUnidad: unidad.idUnidad || 0,
      estado: Boolean(unidad.estado),
    }));

  return (
    <div className="p-4">
      <div className="flex pb-4 pt-4">
        <Card className="w-full">
          <CardBody>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Gestionar Unidades</h1>
              <div className="flex gap-2">
                <Button
                  className="text-white bg-primary"
                  onPress={handleGoToElemento}
                >
                  Elementos
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Modall
        ModalTitle="Registrar Nueva Unidad"
        isOpen={isOpen}
        onOpenChange={handleClose}
      >
        <FormularioUnidades
          addData={handleAddUnidad}
          id="unidad-form"
          onClose={handleClose}
        />
        <div>
          <Buton
            className="w-full p-2 rounded-xl"
            form="unidad-form"
            text="Guardar"
            type="submit"
          />
        </div>
      </Modall>

      <Modall
        ModalTitle="Editar Unidad"
        isOpen={IsOpenUpdate}
        onOpenChange={handleCloseUpdate}
      >
        {selectedUnidad && (
          <FormUpdate
            id="FormUpdate"
            onclose={handleCloseUpdate}
            unidadId={selectedUnidad.idUnidad as number}
            unidades={UnidadsWithKey ?? []}
          />
        )}
      </Modall>

      {UnidadsWithKey && (
        <Globaltable
          columns={columns}
          data={UnidadsWithKey}
          extraHeaderContent={
            <Buton text="Nueva unidad" onPress={() => setIsOpen(true)} />
          }
          onDelete={(unidad) => handleDelete(unidad.idUnidad)}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};
