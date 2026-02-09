import { Form } from "@heroui/form";
import { addToast, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CaracteristicaCreate,
  CaracteristicaCreateSchema,
} from "@/schemas/Caracteristica";

type FormularioProps = {
  addData: (tipo: CaracteristicaCreate) => Promise<void>;
  onClose: () => void;
  id: string;
};

export default function FormularioCaracteristicas({
  addData,
  onClose,
  id,
}: FormularioProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CaracteristicaCreate>({
    resolver: zodResolver(CaracteristicaCreateSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CaracteristicaCreate) => {
    try {
      await addData(data);
      onClose();
      addToast({
        title: "Registro Exitoso",
        description: "Caracteristica agregado correctamente",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <Form
      className="w-full space-y-4"
      id={id}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Nombre"
        placeholder="Nombre"
        type="text"
        {...register("nombre")}
        errorMessage={errors.nombre?.message}
        isInvalid={!!errors.nombre}
      />
    </Form>
  );
}
