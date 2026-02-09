import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ArrowLeftCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@heroui/input";
import { addToast, Link } from "@heroui/react";

import Buton from "@/components/molecules/Button";
import { forgotPass, forgotPasswordSchema } from "@/schemas/User";
import Card1 from "@/components/molecules/Card";
import usePassword from "@/hooks/Usuarios/usePassword";

function ForgotPassword() {
  const { forgotPassword, isError, error } = usePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: forgotPass) => {
    try {
      await forgotPassword(data);
      reset();

      addToast({
        title: "Email enviado con exito",
        description: "porfavor revisa tu correo",
        color: "success",
      });
    } catch (error: any) {
      if (error?.status && error?.status == 404) {
        addToast({
          title: "Error enviando email",
          description: "No existe un usuario con ese email",
          color: "danger",
        });
      }
      console.error("Error al enviar el email:", error);
    }
  };

  return (
    <div className="min-h-screen static">
      <div className="bg-primaryLight w-full h-64" />
      <div className="w-1/2 flex items-center absolute bottom-44 translate-x-3/4">
        <Card1 className="w-2/4">
          <InformationCircleIcon className="flex size-24 mx-auto text-primary m-5" />
          <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center font-sans text-xl font-bold mb-6">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-center text-sm pb-5">
              Ingresa tu correo y te enviaremos un link para que restablezcas tu
              contraseña
            </p>

            <Input
              {...register("correo")}
              errorMessage={errors.correo?.message}
              isInvalid={!!errors.correo}
              label="correo"
              placeholder="correo@gmail.com"
              type="email"
            />

            {isError && <p>{error}</p>}

            <Buton className="block mx-auto" type="submit">
              Enviar al correo
            </Buton>
          </form>

          <Link
            className="text-xs text-primary text-center mt-4 flex justify-center gap-2"
            href="/login"
          >
            <ArrowLeftCircleIcon className="size-7" />
            Volver al login
          </Link>
        </Card1>
      </div>
    </div>
  );
}

export default ForgotPassword;
