import { Input } from "@heroui/input";
import { addToast, Select, SelectItem } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@heroui/form";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import FormularioRoles from "../Roles/FormRegister";
import Modal from "../modal";

import Buton from "@/components/molecules/Button";
import { useRol } from "@/hooks/Roles/useRol";
import { UserSchema, User } from "@/schemas/User";

type FormularioProps = {
  addData: (user: User) => Promise<void>;
  onClose: () => void;
  id: string;
};

export default function FormularioU({ addData, onClose, id }: FormularioProps) {
  const {
    roles,
    isLoading: loadinRoles,
    isError: errorRoles,
    addRol,
  } = useRol();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
    mode: "onChange",
    defaultValues: {
      estado: true,
    },
  });

  const [showModalRol, setShowModalRol] = useState(false);
  const handleClose = () => setShowModalRol(false);

  const onSubmit = async (data: User) => {
    console.log(data);
    try {
      await addData(data);
      onClose();
      addToast({
        title: "Registro Exitoso",
        description: "Usuario agregado correctamente",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <>
      <Form
        className="w-full space-y-4"
        id={id}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Documento"
          placeholder="Documento"
          type="text"
          {...register("documento", { valueAsNumber: true })}
          errorMessage={errors.documento?.message}
          isInvalid={!!errors.documento}
        />
        <Input
          label="Nombre"
          placeholder="Nombre"
          type="text"
          {...register("nombre")}
          errorMessage={errors.nombre?.message}
          isInvalid={!!errors.nombre}
        />
        <Input
          label="Apellido"
          placeholder="Apellido"
          type="text"
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
          label="Teléfono"
          placeholder="Teléfono"
          type="text"
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

        {errors.estado && (
          <p className="text-red-500">{errors.estado?.message}</p>
        )}
        <Input
          label="Cargo"
          placeholder="Cargo"
          type="text"
          {...register("cargo")}
          errorMessage={errors.cargo?.message}
          isInvalid={!!errors.cargo}
        />
        <Input
          label="Contraseña"
          placeholder="Password"
          type="password"
          {...register("password")}
          autoComplete="off"
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
        />

        {!loadinRoles && !errorRoles && roles && (
          <Controller
            control={control}
            name="fkRol"
            render={({ field }) => (
              <div className="w-full flex">
                <Select
                  errorMessage={errors.fkRol?.message}
                  isInvalid={!!errors.fkRol}
                  label="Rol"
                  placeholder="Selecciona un rol..."
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                >
                  {roles?.length ? (
                    roles
                      .filter((r) => r.estado === true)
                      .map((rol) => (
                        <SelectItem key={rol.idRol} textValue={rol.nombre}>
                          {rol.nombre}
                        </SelectItem>
                      ))
                  ) : (
                    <SelectItem>No hay roles disponibles</SelectItem>
                  )}
                </Select>
                <Buton
                  className="m-2 w-10 h-10 !px-0 !min-w-0 rounded-xl"
                  type="button"
                  onPress={() => setShowModalRol(true)}
                >
                  <PlusCircleIcon />
                </Buton>
              </div>
            )}
          />
        )}
      </Form>
      <Modal
        ModalTitle="Agregar Rol"
        isOpen={showModalRol}
        onOpenChange={handleClose}
      >
        <FormularioRoles
          addData={async (data) => {
            await addRol(data);
          }}
          id="rol"
          onClose={() => setShowModalRol(false)}
        />
        <Buton form="rol" text="Guardar" type="submit" />
      </Modal>
    </>
  );
}
