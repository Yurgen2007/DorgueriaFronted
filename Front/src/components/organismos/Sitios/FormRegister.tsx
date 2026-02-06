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
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4"
    >
      <Input
        label="Nombre del sitio"
        type="text"
        placeholder="Ej: Vitrina Principal"
        {...register("nombre")}
        isInvalid={!!errors.nombre}
        errorMessage={errors.nombre?.message}
      />

      <Input
        label="Estante"
        type="text"
        placeholder="Ej: A-1"
        {...register("estante")}
        isInvalid={!!errors.estante}
        errorMessage={errors.estante?.message}
      />

      <Input
        label="Pasillo"
        type="text"
        placeholder="Ej: Pasillo 2"
        {...register("pasillo")}
        isInvalid={!!errors.pasillo}
        errorMessage={errors.pasillo?.message}
      />
    </Form>
  );
}
