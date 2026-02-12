import { useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import Globaltable from "@/components/organismos/table.tsx";
import { TableColumn } from "@/components/organismos/table.tsx";
import Buton from "@/components/molecules/Button";
import Modall from "@/components/organismos/modal";
import { useElemento } from "@/hooks/Elementos/useElemento";
import { Elemento } from "@/types/Elemento";
import { FormUpdate } from "@/components/organismos/Elementos/FormUpdate";
import { postElementos } from "@/types/Elemento";
import usePermissions from "@/hooks/Usuarios/usePermissions";
import FormularioElementos from "@/components/organismos/Elementos/FormRegister";
import { formatDateColombia } from "@/utils/dateUtils";
import { axiosAPI } from "@/axios/axiosAPI";

export const ElementosTable = () => {
  const { userHasPermission } = usePermissions();

  const { elementos, isLoading, isError, error, addElemento, removeElemento } =
    useElemento();

  //Modal agregar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  //Modal actualizar
  const [IsOpenUpdate, setIsOpenUpdate] = useState(false);
  const [selectedElemento, setSelectedElemento] = useState<Elemento | null>(
    null,
  );

  const navigate = useNavigate();

  const handleGoToUnidad = () => {
    navigate("/bodega/unidades");
  };
  const handleGoToCategoria = () => {
    navigate("/bodega/categorias");
  };
  const handleGoToCaracteristica = () => {
    navigate("/bodega/caracteristicas");
  };

  // Funcion para exportar elementos a Excel
  const handleExportToExcel = async () => {
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");
      
      const response = await fetch(
        `/elementos/export/excel`,
        {
          method: "GET",
          credentials: 'include', // Importante: enviar cookies
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `elementos_${new Date().toISOString().split("T")[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error("Error al exportar:", response.statusText);
      }
    } catch (error) {
      console.error("Error al exportar elementos:", error);
    }
  };

  const handleCloseUpdate = () => {
    setIsOpenUpdate(false);
    setSelectedElemento(null);
  };

  const handleState = async (elemento: Elemento) => {
    if (elemento.idElemento) {
      await removeElemento(elemento.idElemento);
    }
  };

  const handleAddElemento = async (
    elemento: postElementos,
  ): Promise<{ idElemento: number }> => {
    try {
      const response = await addElemento(elemento);

      if (!response || !response.idElemento) {
        throw new Error(
          "No se pudo agregar el elemento. La respuesta no contiene idElemento.",
        );
      }
      handleClose(); // Cierra el modal solo si se ha agregado correctamente

      return { idElemento: response.idElemento };
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
      throw new Error("Error al agregar el elemento: ");
    }
  };

  const handleEdit = (elemento: Elemento) => {
    setSelectedElemento(elemento);
    setIsOpenUpdate(true);
  };

  const columns: TableColumn<Elemento>[] = [
    { key: "nombre", label: "Nombre" },
    { key: "descripcion", label: "Descripcion" },
    {
      key: "createdAt",
      label: "Fecha Creación",
      render: (elemento: Elemento) => (
        <span>
          {elemento.createdAt
            ? new Date(elemento.createdAt).toLocaleDateString("es-ES", {
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
      label: "Fecha Vencimiento",
      render: (elemento: Elemento) => (
        <span>
          {elemento.fechaVencimiento
            ? formatDateColombia(elemento.fechaVencimiento)
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

  const ElementosWithKey = elementos
    ?.filter((elemento) => elemento?.idElemento !== undefined)
    .map((elemento) => ({
      ...elemento,
      key: elemento.idElemento
        ? elemento.idElemento.toString()
        : crypto.randomUUID(),
      idElemento: elemento.idElemento || 0,
      estado: Boolean(elemento.estado),
    }));

  return (
    <div className="p-4">
      <div className="flex pb-4 pt-4">
        <Card className="w-full">
          <CardBody>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Gestionar Elementos</h1>
              <div className="flex gap-2">
                {userHasPermission(60) && (
                  <Buton text="Gestionar Unidad" onPress={handleGoToUnidad} />
                )}
                {userHasPermission(64) && (
                  <Buton
                    text="Gestionar Categoria"
                    onPress={handleGoToCategoria}
                  />
                )}
                {userHasPermission(68) && (
                  <Buton
                    text="Gestionar Caracteristica"
                    onPress={handleGoToCaracteristica}
                  />
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Modall
        ModalTitle="Registrar Nuevo Elemento"
        isOpen={isOpen}
        onOpenChange={handleClose}
      >
        <FormularioElementos
          addData={handleAddElemento}
          id="element-form"
          onClose={handleClose}
        />
        <div className="justify-center pt-2">
          <Buton
            className="w-full p-2 rounded-xl"
            form="element-form"
            text="Guardar"
            type="submit"
          />
        </div>
      </Modall>

      <Modall
        ModalTitle="Editar Elemento"
        isOpen={IsOpenUpdate}
        onOpenChange={handleCloseUpdate}
      >
        {selectedElemento && typeof selectedElemento.idElemento === 'number' && (
          <FormUpdate
            elementoId={selectedElemento.idElemento}
            elementos={ElementosWithKey ?? []}
            id="FormUpdate"
            onclose={handleCloseUpdate}
          />
        )}
      </Modall>

      {userHasPermission(19) && ElementosWithKey && (
        <Globaltable
          columns={columns}
          data={ElementosWithKey}
          extraHeaderContent={
            <div className="flex gap-2">
              {userHasPermission(18) && (
                <Buton text="Nuevo elemento" onPress={() => setIsOpen(true)} />
              )}
              {userHasPermission(71) && (
                <Buton
                  text="Exportar Excel"
                  onPress={handleExportToExcel}
                  className="bg-green-600 text-white hover:bg-green-700"
                />
              )}
            </div>
          }
          useDeleteInsteadOfChangeState={true}
          onDelete={userHasPermission(21) ? handleState : undefined}
          onEdit={userHasPermission(20) ? handleEdit : undefined}
        />
      )}
    </div>
  );
};
