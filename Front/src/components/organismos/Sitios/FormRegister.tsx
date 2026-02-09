import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/react";

import { sitioCreate, sitioCreateSchema } from "@/schemas/sitios";

type FormularioProps = {
  addData: (data: sitioCreate) => Promise<void>;
  onClose: () => void;
  id: string;
};

export default function FormularioSitio({
  addData,
  onClose,
  id,
}: FormularioProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<sitioCreate>({
    resolver: zodResolver(sitioCreateSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: sitioCreate) => {
    try {
      await addData(data);
      onClose();
      addToast({
        title: "Registro Exitoso",
        description: "Sitio agregado correctamente",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.error("Error al guardar sitio:", error);
    }
  };

  return (
    <Form
      className="w-full space-y-4"
      id={id}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Nombre del sitio"
        placeholder="Ej: Vitrina Principal"
        type="text"
        {...register("nombre")}
        errorMessage={errors.nombre?.message}
        isInvalid={!!errors.nombre}
      />

      <Input
        label="Estante"
        placeholder="Ej: A-1"
        type="text"
        {...register("estante")}
        errorMessage={errors.estante?.message}
        isInvalid={!!errors.estante}
      />

      <Input
        label="Pasillo"
        placeholder="Ej: Pasillo 2"
        type="text"
        {...register("pasillo")}
        errorMessage={errors.pasillo?.message}
        isInvalid={!!errors.pasillo}
      />
    </Form>
  );
}
