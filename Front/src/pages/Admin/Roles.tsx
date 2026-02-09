import { useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import Globaltable from "@/components/organismos/table.tsx"; // Importar la tabla reutilizable
import { TableColumn } from "@/components/organismos/table.tsx";
import Buton from "@/components/molecules/Button";
import Modall from "@/components/organismos/modal";
import { useRol } from "@/hooks/Roles/useRol";
import { FormUpdate } from "@/components/organismos/Roles/FormUpdate";
import { Rol } from "@/types/Rol";
import FormularioRolPermiso from "@/components/organismos/RolPermiso/FormularioRolPermiso";
import FormularioRoles from "@/components/organismos/Roles/FormRegister";
import usePermissions from "@/hooks/Usuarios/usePermissions";

export const RolTable = () => {
  const { roles, isLoading, isError, error, addRol, removeRol } = useRol();

  const { userHasPermission } = usePermissions();

  //Modal agregar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  //Modal actualizar
  const [IsOpenUpdate, setIsOpenUpdate] = useState(false);
  const [selectedRol, setSelectedRol] = useState<Rol | null>(null);
  const [rolParaPermisos, setRolParaPermisos] = useState<number | null>(null);
  const [showPermisosModal, setShowPermisosModal] = useState(false);

  const handleAsignarPermisos = (idRol: number) => {
    setRolParaPermisos(idRol);
    setShowPermisosModal(true);
  };

  const handleCerrarPermisos = () => {
    setShowPermisosModal(false);
    setRolParaPermisos(null);
  };

  const navigate = useNavigate();

  const handleGoToUsuario = () => {
    navigate("/admin/usuarios");
  };
  const handleCloseUpdate = () => {
    setIsOpenUpdate(false);
    setSelectedRol(null);
  };

  const handleState = async (rol: Rol) => {
    if (rol.idRol) {
      await removeRol(rol.idRol);
    }
  };

  const handleAddRol = async (data: Rol) => {
    try {
      await addRol(data);
      handleClose();
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
    }
  };

  const handleEdit = (rol: Rol) => {
    if (!rol || !rol.idRol) {
      return;
    }
    setSelectedRol(rol);
    setIsOpenUpdate(true);
  };

  // Definir las columnas de la tabla
  const columns: TableColumn<Rol>[] = [
    { key: "nombre", label: "Nombre" },
    {
      key: "createdAt",
      label: "Fecha CReacion",
      render: (rol: Rol) => (
        <span>
          {rol.createdAt
            ? new Date(rol.createdAt).toLocaleDateString("es-ES", {
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
      render: (rol: Rol) => (
        <span>
          {rol.updatedAt
            ? new Date(rol.updatedAt).toLocaleDateString("es-ES", {
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
      key: "asignarPermisos",
      label: "Permisos",
      render: (rol: Rol) => (
        <Buton
          text="Asignar"
          onPress={() => handleAsignarPermisos(rol.idRol as number)}
        />
      ),
    },
  ];

  if (isLoading) {
    return <span>Cargando datos...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const rolesWithKey = roles
    ?.filter(
      (rol) => rol?.idRol !== undefined && rol?.createdAt && rol?.updatedAt,
    )
    .map((rol) => ({
      ...rol,
      key: rol.idRol ? rol.idRol.toString() : crypto.randomUUID(),
      idRol: rol.idRol || 0,
      estado: Boolean(rol.estado),
    }));

  return (
    <div className="p-4">
      <div className="flex pb-4 pt-4">
        <Card className="w-full">
          <CardBody>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Gestionar Roles</h1>
              <div className="flex gap-2">
                <Buton text="Usuarios" onPress={handleGoToUsuario} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Modall
        ModalTitle="Registrar Rol"
        isOpen={isOpen}
        onOpenChange={handleClose}
      >
        <FormularioRoles
          addData={handleAddRol}
          id="rol-form"
          onClose={handleClose}
        />
        <Buton
          className="w-full rounded-xl"
          form="rol-form"
          text="Guardar"
          type="submit"
        />
      </Modall>

      <Modall
        ModalTitle="Editar Rol"
        isOpen={IsOpenUpdate}
        onOpenChange={handleCloseUpdate}
      >
        {selectedRol && (
          <FormUpdate
            id="FormUpdate"
            onclose={handleCloseUpdate}
            rolId={selectedRol.idRol as number}
            roles={rolesWithKey ?? []}
          />
        )}
      </Modall>
      <Modall
        ModalTitle="Asignar Permisos"
        isOpen={showPermisosModal}
        size="5xl"
        onOpenChange={handleCerrarPermisos}
      >
        {typeof rolParaPermisos === "number" && (
          <FormularioRolPermiso rol={rolParaPermisos} />
        )}
      </Modall>

      {userHasPermission(34) && rolesWithKey && (
        <Globaltable
          columns={columns}
          data={rolesWithKey}
          extraHeaderContent={
            <div>
              {userHasPermission(33) && (
                <Buton text="Nuevo rol" onPress={() => setIsOpen(true)} />
              )}
            </div>
          }
          useDeleteInsteadOfChangeState={true}
          onDelete={userHasPermission(36) ? handleState : undefined}
          onEdit={userHasPermission(35) ? handleEdit : undefined}
        />
      )}
    </div>
  );
};
