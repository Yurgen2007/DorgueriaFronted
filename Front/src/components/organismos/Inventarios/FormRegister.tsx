import { Form } from "@heroui/form";
import { addToast, Input, Select, SelectItem } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import Modal from "../modal";
import FormularioElementos from "../Elementos/FormRegister";

import Buton from "@/components/molecules/Button";
import { InventarioCreate, InventarioCreateSchema } from "@/schemas/Inventario";
import { useElemento } from "@/hooks/Elementos/useElemento";
import { useSitios } from "@/hooks/sitios/useSitios";
type FormularioProps = {
  addData: (inventario: InventarioCreate) => Promise<void>;
  onClose: () => void;
  id: string;
  idSitio: number;
};

export default function FormularioInventario({
  addData,
  onClose,
  id,
  idSitio,
}: FormularioProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InventarioCreate>({
    resolver: zodResolver(InventarioCreateSchema),
    mode: "onChange",
    defaultValues: {
      stock: 0,
      estado: true,
    },
  });
  const {
    sitios,
    isLoading: loadingSitios,
    isError: errorSitios,
  } = useSitios();
  const {
    elementos,
    isLoading: loadingElementos,
    isError: errorElementos,
    addElemento,
  } = useElemento();

  const [showModalElemento, setShowModalElemento] = useState(false);

  const handleCloseElemento = () => setShowModalElemento(false);

  const onSubmit = async (data: InventarioCreate) => {
    try {
      await addData(data);
      onClose();
      addToast({
        title: "Registro Exitoso",
        description: "Elemento agregado al inventario correctamente",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.error("Error al guardar el elemento:", error);
    }
  };

  console.log("Errores", errors);

  return (
    <>
      <Form
        className="w-full space-y-4"
        id={id}
        onSubmit={handleSubmit(onSubmit)}
      >
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

        {!loadingSitios && !errorSitios && Array.isArray(sitios) && (
          <Controller
            control={control}
            defaultValue={typeof idSitio === "number" ? idSitio : undefined}
            name="fkSitio"
            render={({ field }) => {
              const sitioActual = sitios.find((s) => s.idSitio === idSitio);

              return (
                <div className="w-full">
                  {idSitio && sitioActual ? (
                    <Input
                      isDisabled
                      isReadOnly
                      className="w-full"
                      label="Sitio"
                      value={sitioActual.nombre}
                    />
                  ) : (
                    <Select
                      className="w-full"
                      errorMessage={errors.fkSitio?.message}
                      isInvalid={!!errors.fkSitio}
                      label="Sitio"
                      placeholder="Selecciona un sitio"
                      selectedKeys={field.value ? [String(field.value)] : []}
                      onChange={(e) => {
                        const sitioId = Number(e.target.value);

                        field.onChange(sitioId);
                      }}
                    >
                      {sitios
                        .filter((i) => i.estado === true)
                        .map((sitio) => (
                          <SelectItem
                            key={sitio.idSitio}
                            textValue={sitio.nombre}
                          >
                            {sitio.nombre}
                          </SelectItem>
                        ))}
                    </Select>
                  )}
                </div>
              );
            }}
          />
        )}

        {!loadingElementos && !errorElementos && elementos && (
          <Controller
            control={control}
            name="fkElemento"
            render={({ field }) => (
              <div className="w-full flex">
                <Select
                  {...field}
                  aria-label="Seleccionar elemento"
                  className="w-full"
                  errorMessage={errors.fkElemento?.message}
                  isInvalid={!!errors.fkElemento}
                  label="Elemento"
                  placeholder="Selecciona un elemento"
                  selectedKeys={field.value ? [field.value.toString()] : []}
                  onChange={(e) => {
                    const elementoId = Number(e.target.value);

                    field.onChange(elementoId);
                  }}
                >
                  {elementos.length ? (
                    elementos
                      .filter((e) => e.estado === true)
                      .map((elemento) => (
                        <SelectItem
                          key={elemento.idElemento}
                          textValue={elemento.nombre}
                        >
                          {elemento.nombre}
                        </SelectItem>
                      ))
                  ) : (
                    <SelectItem isDisabled>
                      No hay elementos disponibles
                    </SelectItem>
                  )}
                </Select>
                <Buton
                  className="m-2 w-10 h-10 !px-0 !min-w-0 rounded-xl"
                  type="button"
                  onPress={() => setShowModalElemento(true)}
                >
                  <PlusCircleIcon />
                </Buton>
              </div>
            )}
          />
        )}
      </Form>
      <Modal
        ModalTitle="Agregar Elemento"
        isOpen={showModalElemento}
        onOpenChange={handleCloseElemento}
      >
        <FormularioElementos
          addData={async (data) => {
            return await addElemento(data);
          }}
          id="user"
          onClose={() => setShowModalElemento(false)}
        />
        <Buton form="user" text="Guardar" type="submit" />
      </Modal>
    </>
  );
}
