import { Form } from "@heroui/react";
import { addToast, Input } from "@heroui/react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import Modal from "../modal";
import FormularioElementos from "../Elementos/FormRegister";

import Buton from "@/components/molecules/Button";
import { InventarioCreate, InventarioCreateSchema } from "@/schemas/Inventario";
import { useElemento } from "@/hooks/Elementos/useElemento";
type FormularioProps = {
  addData: (inventario: InventarioCreate) => Promise<void>;
  onClose: () => void;
  id: string;
};

export default function FormularioInventario({
  addData,
  onClose,
  id,
}: FormularioProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InventarioCreate>({
    mode: "onChange",
    resolver: zodResolver(InventarioCreateSchema),
    defaultValues: {
      nombre: "",
      estado: true,
    },
  });

  const {
    elementos,
    isLoading: loadingElementos,
    isError: errorElementos,
    addElemento,
  } = useElemento();

  const [showModalElemento, setShowModalElemento] = useState(false);

  const handleCloseElemento = () => setShowModalElemento(false);

  const onSubmit: SubmitHandler<InventarioCreate> = async (data) => {
    try {
      await addData(data);
      onClose();
      addToast({
        title: "Registro Exitoso",
        description: "Elemento agregado al inventario correctamente",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.error("Error al guardar el elemento:", error);
    }
  };

  console.log("Errores", errors);

  return (
    <>
      <Form
        className="w-full space-y-4"
        id={id}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="nombre"
          render={({ field }) => (
            <Input
              {...field}
              isInvalid={!!errors.nombre}
              errorMessage={errors.nombre?.message}
              label="Nombre"
              placeholder="Ingresa el nombre del inventario"
            />
          )}
        />
      </Form>
      <Modal
        ModalTitle="Agregar Elemento"
        isOpen={showModalElemento}
        onOpenChange={handleCloseElemento}
      >
        <FormularioElementos
          addData={async (data) => {
            return await addElemento(data);
          }}
          id="user"
          onClose={() => setShowModalElemento(false)}
        />
        <Buton form="user" text="Guardar" type="submit" />
      </Modal>
    </>
  );
}
