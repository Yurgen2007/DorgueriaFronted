import { Form } from "@heroui/form";
import { addToast, Input, Select, SelectItem } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UnidadCreate, UnidadCreateSchema } from "@/schemas/Unidad";

type FormularioProps = {
  addData: (unidad: UnidadCreate) => Promise<void>;
  onClose: () => void;
  id: string;
};

export default function FormularioUnidades({
  addData,
  onClose,
  id,
}: FormularioProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UnidadCreate>({
    resolver: zodResolver(UnidadCreateSchema),
    mode: "onChange",
    defaultValues: {
      estado: true,
    },
  });

  const onSubmit = async (data: UnidadCreate) => {
    try {
      await addData(data);
      onClose();
      addToast({
        title: "Registro Exitoso",
        description: "Unidad agregada correctamente",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  console.log("Errores", errors);

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
            placeholder="Seleccione un estado"
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
