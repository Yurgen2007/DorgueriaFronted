import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { addToast, Select, SelectItem } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CategoriaSchema, Categoria } from "@/schemas/Categorias";

type FormularioProps = {
  addData: (categorias: Categoria) => Promise<void>;
  onClose: () => void;
  id: string;
};

export default function FormCategorias({
  addData,
  onClose,
  id,
}: FormularioProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Categoria>({
    resolver: zodResolver(CategoriaSchema),
    mode: "onChange",
    defaultValues: {
      estado: true,
    },
  });

  const onSubmit = async (data: Categoria) => {
    try {
      await addData(data);
      onClose();
      addToast({
        title: "Registro Exitoso",
        description: "Categoria agregada correctamente",
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
      <Controller
        control={control}
        name="estado"
        render={({ field }) => (
          <Select
            label="Estado"
            placeholder="Selecciona estado"
            {...field}
            isDisabled
            defaultSelectedKeys={["true"]}
            errorMessage={errors.estado?.message}
            isInvalid={!!errors.estado}
            value={field.value ? "true" : "false"}
            onChange={(e) => field.onChange(e.target.value === "true")}
          >
            <SelectItem key="true">Activo</SelectItem>
            <SelectItem key="false">Inactivo</SelectItem>
          </Select>
        )}
      />
    </Form>
  );
}
