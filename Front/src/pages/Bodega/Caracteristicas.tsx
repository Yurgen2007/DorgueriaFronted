import Globaltable from "@/components/organismos/table.tsx"; // Importar la tabla reutilizable
import { TableColumn } from "@/components/organismos/table.tsx";
import Buton from "@/components/molecules/Button";
import { useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useCaracteristica } from "@/hooks/Caracteristicas/useCaracteristicas";
import { Caracteristica } from "@/types/Caracteristica";
import Modall from "@/components/organismos/modal";
import { FormUpdate } from "@/components/organismos/Caracteristicas/FormUpdate";
import FormularioCaracteristicas from "@/components/organismos/Caracteristicas/FormRegister";

export const CaracteristicasTable = () => {
  const { caracteristicas, isLoading, isError, error, addCaracteristica } =
    useCaracteristica();

  //Modal agregar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  //Modal actualizar
  const [IsOpenUpdate, setIsOpenUpdate] = useState(false);
  const [selectedCaracteristicas, setSelectedCaracteristicas] =
    useState<Caracteristica | null>(null);

  const navigate = useNavigate();

  const handleGoToElemento = () => {
    navigate("/bodega/elementos");
  };

  const handleCloseUpdate = () => {
    setIsOpenUpdate(false);
    setSelectedCaracteristicas(null);
  };

  const handleAddCaracteristicas = async (caracteristica: Caracteristica) => {
    try {
      await addCaracteristica(caracteristica);

      handleClose();
    } catch (error) {
      console.error("Error al agregar la característica:", error);
    }
  };

  const handleEdit = (caracteristica: Caracteristica) => {
    setSelectedCaracteristicas(caracteristica);
    setIsOpenUpdate(true);
  };


  const columns: TableColumn<Caracteristica>[] = [
    { key: "nombre", label: "Nombre" },
    {
      key: "createdAt",
      label: "Fecha Creación",
      render: (caracteristica: Caracteristica) => (
        <span>
          {caracteristica.createdAt
            ? new Date(caracteristica.createdAt).toLocaleDateString("es-ES", {
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
      render: (caracteristica: Caracteristica) => (
        <span>
          {caracteristica.updatedAt
            ? new Date(caracteristica.updatedAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            : "N/A"}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return <span>Cargando datos...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const CaracteristicassWithKey = caracteristicas
    ?.filter((caracteristica) => caracteristica?.idCaracteristica !== undefined)
    .map((caracteristica) => ({
      ...caracteristica,
      key: caracteristica.idCaracteristica
        ? caracteristica.idCaracteristica.toString()
        : crypto.randomUUID(),
      idCaracteristica: caracteristica.idCaracteristica || 0,
    }));

  return (
    <div className="p-4">
      <div className="flex pb-4 pt-4">
        <Card className="w-full">
          <CardBody>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Gestionar Caracteristicas</h1>
              <div className="flex gap-2">
                <Buton text="Elementos" onPress={handleGoToElemento} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Modall
        ModalTitle="Registrar Nueva Caracteristica"
        isOpen={isOpen}
        onOpenChange={handleClose}
      >
        <FormularioCaracteristicas
          id="caracteristica-form"
          addData={handleAddCaracteristicas}
          onClose={handleClose}
        />
        <Buton
          text="Guardar"
          type="submit"
          form="caracteristica-form"
          className="w-full rounded-xl"
        />
      </Modall>

      <Modall
        ModalTitle="Editar Caracteristica"
        isOpen={IsOpenUpdate}
        onOpenChange={handleCloseUpdate}
      >
        {selectedCaracteristicas && (
          <FormUpdate
            caracteristicas={CaracteristicassWithKey ?? []}
            caracteristicaId={
              selectedCaracteristicas.idCaracteristica as number
            }
            id="FormUpdate"
            onclose={handleCloseUpdate}
          />
        )}
      </Modall>

      {CaracteristicassWithKey && (
        <Globaltable
          data={CaracteristicassWithKey}
          columns={columns}
          onEdit={handleEdit}
          extraHeaderContent={
            <Buton
              text="Nueva caracteristica"
              onPress={() => setIsOpen(true)}
            />
          }
        />
      )}
    </div>
  );
};
