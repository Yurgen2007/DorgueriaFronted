import { Form } from "@heroui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/react";

import { sitioUpdate, sitioUpdateSchema } from "@/schemas/sitios";
import { useSitios } from "@/hooks/sitios/useSitios";
import Buton from "@/components/molecules/Button";

type Props = {
  sitios: (sitioUpdate & { idSitio: number })[];
  sitioId: number;
  id: string;
  onclose: () => void;
};

export const FormUpdate = ({ sitios, sitioId, id, onclose }: Props) => {
  const { updateSitio, getSitioById } = useSitios();

  const foundSitio = getSitioById(sitioId, sitios) as sitioUpdate;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<sitioUpdate>({
    resolver: zodResolver(sitioUpdateSchema),
    mode: "onChange",
    defaultValues: {
      idSitio: foundSitio?.idSitio,
      nombre: foundSitio?.nombre,
      estante: foundSitio?.estante,
      pasillo: foundSitio?.pasillo,
    },
  });

  const onSubmit = async (data: sitioUpdate) => {
    if (!data.idSitio) return;
    try {
      await updateSitio(data.idSitio, data);
      onclose();
      addToast({
        title: "Actualización Exitosa",
        description: "Sitio actualizado correctamente",
        color: "primary",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.log("Error al actualizar el sitio : ", error);
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
        placeholder="Nombre"
        type="text"
        {...register("nombre")}
        errorMessage={errors.nombre?.message}
        isInvalid={!!errors.nombre}
      />

      <Input
        label="Estante"
        placeholder="Estante"
        type="text"
        {...register("estante")}
        errorMessage={errors.estante?.message}
        isInvalid={!!errors.estante}
      />

      <Input
        label="Pasillo"
        placeholder="Pasillo"
        type="text"
        {...register("pasillo")}
        errorMessage={errors.pasillo?.message}
        isInvalid={!!errors.pasillo}
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
