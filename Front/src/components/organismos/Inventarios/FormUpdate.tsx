import { Input } from "@heroui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast } from "@heroui/react";
import { AxiosError } from "axios";

import Buton from "@/components/molecules/Button";
import { useInventario } from "@/hooks/Inventarios/useInventario";
import { InventarioUpdate, InventarioUpdateSchema } from "@/schemas/Inventario";

type FormuProps = {
  inventarios: InventarioUpdate[];
  inventarioId: number;
  id: string;
  onclose: () => void;
};

export const FormUpdate = ({
  inventarios,
  inventarioId,
  id,
  onclose,
}: FormuProps) => {
  const { updateInventario, getInventarioById } = useInventario();

  const foundInventario = getInventarioById(
    inventarioId,
    inventarios,
  ) as InventarioUpdate;

  if (!foundInventario) {
    return (
      <div className="p-4 text-red-500">Error: Inventario no encontrado</div>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InventarioUpdate>({
    resolver: zodResolver(InventarioUpdateSchema),
    mode: "onChange",
    defaultValues: {
      idInventario: foundInventario.idInventario,
      stock: foundInventario.stock,
    },
  });

  const onSubmit = async (data: InventarioUpdate) => {
    console.log("Enviando datos:", data);
    if (!data.idInventario) return;
    try {
      await updateInventario(data.idInventario, data);
      onclose();
      addToast({
        title: "Actualizacion Exitosa",
        description: "Stock actualizado correctamente",
        color: "primary",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string | string[] }>;
      const backendMessage =
        err?.response?.data?.message || "Ocurrió un error inesperado";

      addToast({
        title: "Debes activar el elemento para poder agregar stock",
        description: backendMessage,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      console.error("Error al actualizar el área: ", error);
    }
  };

  console.log("Errores", errors);

  return (
    <form
      className="w-full space-y-4"
      id={id}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Cantidad"
        placeholder="Ingrese la cantidad ..."
        {...register("stock", { valueAsNumber: true })}
        errorMessage={errors.stock?.message}
        isInvalid={!!errors.stock}
      />
      <Buton
        className="w-full rounded-xl"
        isLoading={isSubmitting}
        text="Guardar"
        type="submit"
      />
    </form>
  );
};
