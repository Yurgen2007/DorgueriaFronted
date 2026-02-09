import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { addToast, useModalContext } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

import Buton from "@/components/molecules/Button";
import { postMassiveUsuarios } from "@/axios/Usuarios/postMassiveUsuarios";

export default function FormRegisterMasivo() {
  const queryClient = useQueryClient();

  const { onClose } = useModalContext();

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) return setError("Selecciona un archivo primero");
    const formData = new FormData();

    formData.append("excel", file);
    try {
      await postMassiveUsuarios(formData);
      addToast({
        title: "Usuarios subidos exitosamente",
        description: "Los usuarios se crearon en la base de datos",
        color: "success",
      });
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    } catch (error) {
      console.log(error);
      console.log("esto es formdata", formData);
      addToast({
        title: "Error subiendo usuarios",
        description: "Hubo un error intentando subir los usuarios",
        color: "danger",
      });
    }
  }

  return (
    <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <a
        download
        href={`${import.meta.env.VITE_API_CLIENT}img/excel/FORMATO EXCEL.xlsx`}
      >
        <Button color="success" variant="bordered">
          Descargar formato
        </Button>
      </a>
      <Input accept=".xlsx,.xls" type="file" onChange={handleFileChange} />
      {file && <p>Selected file: {file.name}</p>}

      {error && <p>{error}</p>}
      <div className="flex gap-2">
        <Buton className="bg-red-500" type="button" onPress={() => onClose()}>
          Cancelar
        </Buton>
        <Buton type="submit">Crear usuarios</Buton>
      </div>
    </Form>
  );
}
