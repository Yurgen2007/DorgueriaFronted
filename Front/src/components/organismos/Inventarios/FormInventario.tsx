import { Form } from "@heroui/form";
import { Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/react";
import Buton from "@/components/molecules/Button";
import { useInventario } from "@/hooks/Inventarios/useInventario";

type FormularioProps = {
  onClose: () => void;
  id: string;
};

export default function FormInventario({ onClose, id }: FormularioProps) {
  const { addInventario } = useInventario();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nombre: "",
      estado: true,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await addInventario({
        ...data,
        nombre: data.nombre,
        estado: true,
      });
      onClose();
      addToast({
        title: "Inventario Creado",
        description: "El inventario se ha creado correctamente",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.error("Error al crear el inventario:", error);
      addToast({
        title: "Error",
        description: "No se pudo crear el inventario",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }
  };

  return (
    <Form id={id} onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <Input
        label="Nombre del Inventario"
        placeholder="Ingresa el nombre del inventario"
        {...register("nombre", {
          required: "El nombre es obligatorio",
          minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres",
          },
        })}
        isInvalid={!!errors.nombre}
        errorMessage={errors.nombre?.message as string}
      />
    </Form>
  );
}
