import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UpPerfil } from "@/types/Usuario";
import { patchPerfil } from "@/axios/Usuarios/patchPerfil";
import Buton from "@/components/molecules/Button";
import { Perfil, PerfilSchema } from "@/schemas/User";

type PropsPerfil = {
  inicialData: UpPerfil;
  onclose: () => void;
};

function FormPerfil({ inicialData, onclose }: PropsPerfil) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Perfil>({
    defaultValues: inicialData,
    resolver: zodResolver(PerfilSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: Perfil) => {
    try {
      const response = await patchPerfil(data);

      console.log("datos actualizados", response);
      onclose();
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    }
  };

  return (
    <div>
      <Form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nombre"
          placeholder="Nombre"
          {...register("nombre")}
          errorMessage={errors.nombre?.message}
          isInvalid={!!errors.nombre}
        />
        <Input
          label="Apellido"
          placeholder="Apellido"
          {...register("apellido")}
          errorMessage={errors.apellido?.message}
          isInvalid={!!errors.apellido}
        />
        <Input
          label="Edad"
          placeholder="Edad"
          type="text"
          {...register("edad", { valueAsNumber: true })}
          errorMessage={errors.edad?.message}
          isInvalid={!!errors.edad}
        />
        <Input
          label="Telefono"
          placeholder="Telefono"
          {...register("telefono")}
          errorMessage={errors.telefono?.message}
          isInvalid={!!errors.telefono}
        />
        <Input
          label="Correo"
          placeholder="Correo"
          type="email"
          {...register("correo")}
          errorMessage={errors.correo?.message}
          isInvalid={!!errors.correo}
        />
        <Input
          label="Password"
          placeholder="Contraseña"
          type="password"
          {...register("password")}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
        />
        <Buton type="submit">Enviar</Buton>
      </Form>
    </div>
  );
}

export default FormPerfil;
