import { useState } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

import { CodigoInventario } from "../../CodigoInventario";

import Globaltable from "@/components/organismos/table.tsx"; // Importar la tabla reutilizable
import { TableColumn } from "@/components/organismos/table.tsx";
import Buton from "@/components/molecules/Button";
import Modall from "@/components/organismos/modal";
import { useElemento } from "@/hooks/Elementos/useElemento";
import { Elemento } from "@/types/Elemento";
import { FormAgregateStock } from "@/components/organismos/Inventarios/FormAgregateStock";
import { FormUpdate } from "@/components/organismos/Elementos/FormUpdate";
import usePermissions from "@/hooks/Usuarios/usePermissions";

interface InventariosTableProps {
  elementos?: Elemento[];
  idSitio?: number;
}

export const InventariosTable = ({ idSitio }: InventariosTableProps) => {
  const { userHasPermission } = usePermissions();

  const {
    elementos: elementosHook,
    isLoading,
    isError,
    error,
    changeState,
  } = useElemento();

  //Modal actualizar
  const [IsOpenUpdate, setIsOpenUpdate] = useState(false);
  const [selectedElementoStock, setSelectedElementoStock] =
    useState<Elemento | null>(null);
  const [isOpenCodigos, setIsOpenCodigos] = useState(false);
  const [elementoCodigos, setElementoCodigos] = useState<Elemento | null>(null);

  const handleCloseCodigos = () => {
    setIsOpenCodigos(false);
    setElementoCodigos(null);
  };

  const handleOpenCodigos = (elemento: Elemento) => {
    setElementoCodigos(elemento);
    setIsOpenCodigos(true);
  };

  const handleCloseUpdate = () => {
    setIsOpenUpdate(false);
    setSelectedElementoStock(null);
  };

  const handleState = async (idElemento: number) => {
    await changeState(idElemento);
  };

  const handleOpenAddStock = (elemento: Elemento) => {
    setSelectedElementoStock(elemento);
    setIsOpenUpdate(true);
  };

  const columns: TableColumn<Elemento>[] = [
    {
      key: "nombre",
      label: "Elemento",
      render: (elemento: Elemento) => <span>{elemento.nombre}</span>,
    },
    {
      key: "imagen",
      label: "Imagen",
      render: (elemento: Elemento) => {
        const imagen = elemento.imagen;

        if (!imagen) return <span>No encontrado</span>;

        const src = `${import.meta.env.VITE_API_CLIENT}img/img/elementos/${imagen}`;

        return (
          <img
            alt="Imagen del elemento"
            className="justify-center relative left-6 h-28 rounded shadow"
            src={src}
          />
        );
      },
    },
    {
      key: "stock",
      label: "Cantidad",
      render: (elemento: Elemento) => {
        const cantidad = elemento.stock ?? 0;

        let color = "text-gray-500";
        let estado = "Sin stock";

        if (cantidad >= 50) {
          color = "text-primary font-bold";
          estado = "Suficiente";
        } else if (cantidad >= 16) {
          color = "text-yellow-500 font-semibold";
          estado = "Moderado";
        } else if (cantidad > 0 && cantidad <= 15) {
          color = "text-red-500 font-semibold";
          estado = "Bajo";
        }

        return (
          <span className={color}>
            {cantidad} <span className="ml-1 text-sm">({estado})</span>
          </span>
        );
      },
    },
    {
      key: "nombre", // Using an existing key to avoid TS error
      label: "Unidad",
      render: (elemento: Elemento) => {
        const unidad =
          (elemento as any).fkUnidadMedida?.nombre ?? "No definido";

        return <span>{unidad}</span>;
      },
    },
    {
      key: "fkInventario",
      label: "Grupo",
      render: (elemento: Elemento) => {
        const grupo = (elemento as any).fkInventario?.nombre ?? "Sin grupo";

        return <span>{grupo}</span>;
      },
    },
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
    { key: "estado", label: "Estado" },
    {
      key: "idElemento", // Using an existing key to avoid TS error
      label: "",
      render: (elemento: Elemento) => (
        <div className="flex gap-2">
          {!!elemento.fkCaracteristica && (
            <Buton
              className="w-[50px] h-[40px] p-0 min-w-0 bg-primary hover:bg-gray-700 text-white"
              onPress={() => handleOpenCodigos(elemento)}
            >
              <DocumentTextIcon />
            </Buton>
          )}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <span>Cargando datos...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const filteredBySite = elementosHook?.filter((elemento) =>
    idSitio ? elemento.fkSitio?.idSitio === idSitio : true,
  );

  const ElementosWithKey = filteredBySite?.map((elemento) => ({
    ...elemento,
    key: elemento.idElemento
      ? elemento.idElemento.toString()
      : crypto.randomUUID(),
    idElemento: elemento.idElemento || 0,
    estado: Boolean(elemento.estado),
  }));

  console.log("Elementos filtrados por sitio:", filteredBySite);
  console.log("idSitio recibido por props:", idSitio);

  return (
    <div className="p-4">
      {!idSitio && (
        <h1 className="text-2xl font-bold mb-4 text-center">
          Inventarios Registrados
        </h1>
      )}

      <Modall
        ModalTitle="Agregar Stock"
        isOpen={IsOpenUpdate}
        onOpenChange={handleCloseUpdate}
      >
        {selectedElementoStock ? (
          !!selectedElementoStock.fkCaracteristica ? (
            <FormAgregateStock
              fkElemento={selectedElementoStock.idElemento!}
              fkSitio={selectedElementoStock.fkSitio?.idSitio!}
              onClose={handleCloseUpdate}
            />
          ) : (
            <FormUpdate
              elementoId={selectedElementoStock.idElemento!}
              elementos={elementosHook ?? []}
              id="FormUpdate"
              onclose={handleCloseUpdate}
            />
          )
        ) : null}
      </Modall>
      <Modall
        ModalTitle="Códigos del Inventario"
        isOpen={isOpenCodigos}
        onOpenChange={handleCloseCodigos}
      >
        {elementoCodigos && (
          <CodigoInventario
            idElemento={elementoCodigos.idElemento!}
            isOpen={isOpenCodigos}
            tieneCaracteristicas={!!elementoCodigos.fkCaracteristica}
            onClose={handleCloseCodigos}
          />
        )}
      </Modall>

      {userHasPermission(29) && ElementosWithKey && (
        <Globaltable
          columns={columns ?? []}
          data={ElementosWithKey as any[]}
          onDelete={
            userHasPermission(31)
              ? (elemento) => handleState(elemento.idElemento)
              : undefined
          }
        />
      )}
    </div>
  );
};
