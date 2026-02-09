import { Form } from "@heroui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/react";

import Buton from "@/components/molecules/Button";
import { useCategoria } from "@/hooks/Categorias/useCategorias";
import { CategoriaUpdate, CategoriaUpdateSchema } from "@/schemas/Categorias";

type Props = {
  categorias: CategoriaUpdate[];
  categoriaId: number;
  id: string;
  onclose: () => void;
};

const FormUpCentro = ({ categoriaId, id, onclose }: Props) => {
  const { updateCategoria, getCategoriaById } = useCategoria();

  const foundCategoria = getCategoriaById(categoriaId) as CategoriaUpdate;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(CategoriaUpdateSchema),
    mode: "onChange",
    defaultValues: {
      idCategoria: foundCategoria.idCategoria,
      nombre: foundCategoria.nombre,
    },
  });

  const onSubmit = async (data: CategoriaUpdate) => {
    try {
      await updateCategoria(data.idCategoria as number, data);

      onclose();
      addToast({
        title: "Actualizacion Exitosa",
        description: "Categoria actuaizada correctamente",
        color: "primary",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.log("Error al actualizar el centro", error);
    }
  };

  return (
    <Form
      className="w-full space-y-4"
      id={id}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("nombre")}
        errorMessage={errors.nombre?.message}
        isInvalid={!!errors.nombre}
        label="Nombre"
        type="text"
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

export default FormUpCentro;
