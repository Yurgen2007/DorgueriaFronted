import { Form } from "@heroui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@heroui/input";
import { sitioUpdate, sitioUpdateSchema } from "@/schemas/sitios";
import { useSitios } from "@/hooks/sitios/useSitios";
import { addToast } from "@heroui/react";
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
      id={id}
      className="w-full space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Nombre del sitio"
        type="text"
        placeholder="Nombre"
        {...register("nombre")}
        isInvalid={!!errors.nombre}
        errorMessage={errors.nombre?.message}
      />

      <Input
        label="Estante"
        type="text"
        placeholder="Estante"
        {...register("estante")}
        isInvalid={!!errors.estante}
        errorMessage={errors.estante?.message}
      />

      <Input
        label="Pasillo"
        type="text"
        placeholder="Pasillo"
        {...register("pasillo")}
        isInvalid={!!errors.pasillo}
        errorMessage={errors.pasillo?.message}
      />

      <Buton
        text="Guardar"
        type="submit"
        isLoading={isSubmitting}
        className="w-full rounded-xl"
      />
    </Form>
  );
};
