import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addToast } from "@heroui/react";

import Buton from "@/components/molecules/Button";
import {
  CaracteristicaUpdate,
  CaracteristicaUpdateSchema,
} from "@/schemas/Caracteristica";
import { useCaracteristica } from "@/hooks/Caracteristicas/useCaracteristicas";

type Props = {
  caracteristicas: CaracteristicaUpdate[];
  caracteristicaId: number;
  id: string;
  onclose: () => void;
};

export const FormUpdate = ({
  caracteristicas,
  caracteristicaId,
  id,
  onclose,
}: Props) => {
  const { updateCaracteristica, getCaracteristicaById } = useCaracteristica();

  const foundCaracteristica = getCaracteristicaById(
    caracteristicaId,
    caracteristicas,
  ) as CaracteristicaUpdate;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CaracteristicaUpdate>({
    resolver: zodResolver(CaracteristicaUpdateSchema),
    mode: "onChange",
    defaultValues: {
      idCaracteristica: foundCaracteristica.idCaracteristica,
      nombre: foundCaracteristica.nombre,
    },
  });

  const onSubmit = async (data: CaracteristicaUpdate) => {
    console.log(data);
    if (!data.idCaracteristica) return;
    try {
      await updateCaracteristica(data.idCaracteristica, data);
      onclose();
      addToast({
        title: "Actualizacion Exitosa",
        description: "Caracteristica actualizada correctamente",
        color: "primary",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.log("Error al actualizar la característica: ", error);
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
        placeholder="Nombre...."
        {...register("nombre")}
        errorMessage={errors.nombre?.message}
        isInvalid={!!errors.nombre}
      />

      <Buton
        className="w-full rounded-xl"
        isLoading={isSubmitting}
        text="Guardar"
        type="submit"
      />
    </Form>
  );
};
