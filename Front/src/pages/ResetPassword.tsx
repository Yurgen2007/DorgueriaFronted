import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import Buton from "@/components/molecules/Button";
import Card1 from "@/components/molecules/Card";
import usePassword from "@/hooks/Usuarios/usePassword";
import { resetPasswordSchema } from "@/schemas/User";
import { resetPassword } from "@/types/Usuario";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") as string;

  const { resetPassword } = usePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: resetPassword) => {
    try {
      await resetPassword(token, data);
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Error al restablecer la contraseña", error);
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
              Restablece tu contraseña
            </h1>
            <p className="text-center text-sm pb-5">
              Ingresa una nueva contraseña{" "}
            </p>

            <Input
              {...register("password")}
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
              label="Nueva contraseña"
              placeholder="escribe tu nueva contraseña"
              type="password"
            />

            <Input
              {...register("confirmPassword")}
              errorMessage={errors.confirmPassword?.message}
              isInvalid={!!errors.confirmPassword}
              label="Confirma tu contraseña"
              placeholder="confirma tu contraseña"
              type="password"
            />

            <Buton className="block mx-auto" type="submit">
              Restablecer contraseña
            </Buton>
          </form>
        </Card1>
      </div>
    </div>
  );
};

export default ResetPassword;
