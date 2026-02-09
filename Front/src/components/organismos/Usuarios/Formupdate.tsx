import { Input } from "@heroui/input";
import { useForm } from "react-hook-form";
import { Form } from "@heroui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import Modal from "../modal";
import FormularioRoles from "../Roles/FormRegister";

import { useRol } from "@/hooks/Roles/useRol";
import Buton from "@/components/molecules/Button";
import { useUsuario } from "@/hooks/Usuarios/useUsuario";
import { UserUpdateSchema, UserUpdate } from "@/schemas/User";

type FormuProps = {
  Users: (UserUpdate & { idUsuario: number })[];
  userId: number;
  id: string;
  onclose: () => void;
};

export const FormUpdate = ({ Users, userId, id, onclose }: FormuProps) => {
  const { updateUser, getUserById } = useUsuario();
  const [showModalRol, setShowModalRol] = useState(false);
  const handleClose = () => setShowModalRol(false);

  const {
    roles,
    isLoading: loadinRoles,
    isError: errorRoles,
    addRol,
  } = useRol();

  const foundUser = getUserById(userId, Users) as UserUpdate;

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdate>({
    resolver: zodResolver(UserUpdateSchema),
    mode: "onChange",
    defaultValues: {
      idUsuario: foundUser.idUsuario,
      nombre: foundUser.nombre,
      apellido: foundUser.apellido,
      edad: Number(foundUser.edad),
      telefono: foundUser.telefono,
      correo: foundUser.correo,
      cargo: foundUser.cargo,
      fkRol: foundUser.fkRol,
    },
  });

  console.log(foundUser.fkRol);
  const onSubmit = async (data: UserUpdate) => {
    console.log(data);
    if (!data.idUsuario) return;
    try {
      await updateUser(data.idUsuario, data);
      onclose();
      addToast({
        title: "Actualiacion Exitosa",
        description: "Usuario actualizado correctamente",
        color: "primary",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      addToast({
        title: "Error al actualizar el usuario",
        description: "Hubo un error intentando actualizar el usuario",
        color: "danger",
      });
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
          label="Cargo"
          placeholder="Cargo"
          {...register("cargo")}
          errorMessage={errors.cargo?.message}
          isInvalid={!!errors.cargo}
        />

        {!loadinRoles && !errorRoles && roles && (
          <div className="w-full flex">
            <Select
              defaultSelectedKeys={`${foundUser.fkRol}`}
              label="Rol"
              onChange={(e) => {
                const fkRol = parseInt(e.target.value);

                setValue("fkRol", isNaN(fkRol) ? undefined : fkRol);
                console.log(watch("fkRol"));
              }}
            >
              {roles?.map((rol) => (
                <SelectItem key={`${rol.idRol}`}>{rol.nombre}</SelectItem>
              ))}
            </Select>
            <Buton
              className="m-2 w-10 h-10 !px-0 !min-w-0 rounded-xl flex"
              type="button"
              onPress={() => setShowModalRol(true)}
            >
              <PlusCircleIcon />
            </Buton>
          </div>
        )}
        <Buton className="w-full rounded-xl" text="Guardar" type="submit" />
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
};
