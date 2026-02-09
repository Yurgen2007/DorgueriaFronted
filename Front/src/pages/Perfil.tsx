import { Avatar } from "@heroui/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { patchFotoPerfil } from "../axios/Usuarios/patchFotoPerfil";

import Card1 from "@/components/molecules/Card";
import { usePerfil } from "@/hooks/Usuarios/usePerfil";
import { useAuth } from "@/providers/AuthProvider";
import FormPerfil from "@/components/organismos/Usuarios/FormPerfil";
import Modall from "@/components/organismos/modal";

function Perfil() {
  const { perfilInfo, setPerfilInfo, isLoading, error } = usePerfil();
  const { setPerfil: setperfilcontext } = useAuth();

  const [isOpenModal, setIsOpenModal] = useState(false);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!perfilInfo) return <div>No se encontraron datos del perfil</div>;

  async function handleEditFoto(e: any) {
    const file = e.target.files[0] ?? undefined;

    if (!file) return;
    const response = await patchFotoPerfil(file);

    setPerfilInfo(response.updated);
    setperfilcontext(response.updated.perfil);
  }

  const handleClose = () => setIsOpenModal(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 dark:text-white">
      <Card1 className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative dark:text-white">
        <div className="flex flex-col items-center">
          <button
            className="absolute top-3 right-3 p-1 rounded-full bg-white shadow hover:bg-gray-100 transition"
            onClick={() => setIsOpenModal(true)}
          >
            <PencilIcon className="w-6 h-6 text-gray-600" />
          </button>

          {isOpenModal && (
            <div>
              <h2 className="text-xl font-bold mb-4">Editar perfil</h2>
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center dark:text-white">
            {perfilInfo.fkRol.nombre}
          </h1>
          <div className="relative w-32 h-32 rounded-full mb-4 border-4 border-tealSoft group">
            <Avatar
              className="w-full h-full group-hover:opacity-70 transition duration-200"
              src={`${import.meta.env.VITE_API_CLIENT}img/perfiles/${perfilInfo.perfil || "defaultPerfil.png"}`}
            />
            <PencilIcon
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full h-full p-6 opacity-0 group-hover:opacity-100 transition duration-200"
              color="#fff"
            />
            <input
              accept="image/png, image/jpeg"
              className="absolute top-0 left-0 w-full h-full rounded-full opacity-0"
              type="file"
              onChange={handleEditFoto}
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center dark:text-white">
            {perfilInfo.nombre} {perfilInfo.apellido}
          </h1>
          <div className="w-full space-y-3 text-gray-600 dark:text-white">
            <div className="flex justify-between">
              <span className="font-semibold">Documento:</span>
              <span>{perfilInfo.documento}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Edad:</span>
              <span>{perfilInfo.edad || "No especificada"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Teléfono:</span>
              <span>{perfilInfo.telefono || "No especificado"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Correo:</span>
              <span>{perfilInfo.correo || "No especificado"}</span>
            </div>
          </div>
        </div>
      </Card1>
      <Modall
        ModalTitle="Editar Perfil"
        isOpen={isOpenModal}
        onOpenChange={handleClose}
      >
        <FormPerfil
          inicialData={{
            nombre: perfilInfo.nombre,
            apellido: perfilInfo.apellido,
            edad: perfilInfo.edad,
            telefono: perfilInfo.telefono,
            correo: perfilInfo.correo,
            password: "",
          }}
          onclose={() => setIsOpenModal(false)}
        />
      </Modall>
    </div>
  );
}

export default Perfil;
