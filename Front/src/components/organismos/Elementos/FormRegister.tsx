import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@heroui/form";
import { addToast, Checkbox, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import Modal from "../modal";
import FormularioUnidades from "../UnidadesMedida/FormRegister";
import FormCategorias from "../Categorias/FormCategorias";
import FormularioCaracteristicas from "../Caracteristicas/FormRegister";

import Buton from "@/components/molecules/Button";
import { ElementoCreate, ElementoCreateSchema } from "@/schemas/Elemento";
import { useInventario } from "@/hooks/Inventarios/useInventario";
import { useSitios } from "@/hooks/sitios/useSitios";
import { useCaracteristica } from "@/hooks/Caracteristicas/useCaracteristicas";
import { useCategoria } from "@/hooks/Categorias/useCategorias";
import { useUnidad } from "@/hooks/UnidadesMedida/useUnidad";

type FormularioProps = {
  addData: (elemento: ElementoCreate) => Promise<{ idElemento: number }>;
  onClose: () => void;
  id: string;
};

export default function FormularioElementos({
  addData,
  onClose,
  id,
}: FormularioProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ElementoCreate>({
    resolver: zodResolver(ElementoCreateSchema),
    mode: "onChange",
    defaultValues: {
      estado: true,
      fkSitio: undefined,
      fkInventario: undefined,
      fkCategoria: undefined,
      fkUnidadMedida: undefined,
      codigoBarras: undefined,
      stock: 0,
    },
  });

  const { unidades, addUnidad } = useUnidad();
  const { categorias, addCategoria } = useCategoria();
  const { caracteristicas, addCaracteristica } = useCaracteristica();
  const { sitios } = useSitios();
  const { inventarios } = useInventario();

  const [tieneCaracteristica, setTieneCaracteristica] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCategoria, setShowModalCategoria] = useState(false);
  const [showModalCaracteristica, setShowModalCaracteristica] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleCloseCategoria = () => setShowModalCategoria(false);
  const handleCloseCaracteristica = () => setShowModalCaracteristica(false);

  const onSubmit = async (data: any) => {
    try {
      await addData({
        ...data,
        fkCaracteristica: tieneCaracteristica
          ? (data as ElementoCreate).fkCaracteristica
          : undefined,
      });
      onClose();
      addToast({
        title: "Registro Exitoso",
        description: "Elemento agregado correctamente",
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.error("Error al guardar el elemento:", error);
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
          label="Descripción"
          placeholder="Descripción"
          {...register("descripcion")}
          errorMessage={errors.descripcion?.message}
          isInvalid={!!errors.descripcion}
        />

        <Input
          label="Fecha de Vencimiento"
          type="date"
          {...register("fechaVencimiento")}
          errorMessage={errors.fechaVencimiento?.message}
          isInvalid={!!errors.fechaVencimiento}
        />

        <Input
          label="Código de Barras"
          placeholder="Código de barras"
          {...register("codigoBarras")}
          errorMessage={errors.codigoBarras?.message}
          isInvalid={!!errors.codigoBarras}
        />

        <Input
          accept="image/*"
          label="Imagen"
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? undefined;

            setValue("imagen", file);
          }}
        />

        <Input
          label="Stock Inicial"
          placeholder="0"
          type="number"
          {...register("stock", { valueAsNumber: true })}
          errorMessage={errors.stock?.message}
          isInvalid={!!errors.stock}
        />

        <Controller
          control={control}
          name="fkSitio"
          render={({ field }) => {
            const [query, setQuery] = useState("");
            const [showOptions, setShowOptions] = useState(false);

            const filteredSitios =
              sitios?.filter((s) =>
                s.nombre.toLowerCase().includes(query.toLowerCase()),
              ) || [];

            useEffect(() => {
              // Sincronizar query con el valor del campo
              if (field.value) {
                const selectedSitio = sitios?.find(
                  (s) => s.idSitio === field.value,
                );

                if (selectedSitio) {
                  setQuery(selectedSitio.nombre);
                }
              } else {
                setQuery("");
              }
            }, [field.value, sitios]);

            return (
              <div className="relative w-full">
                <Input
                  errorMessage={errors.fkSitio?.message}
                  isInvalid={!!errors.fkSitio}
                  label="Sitio (Ubicación física)"
                  placeholder="Selecciona un sitio..."
                  value={query}
                  onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowOptions(true);
                    // Limpiar el valor del campo si el texto no coincide con ningún sitio
                    const matchedSitio = sitios?.find(
                      (s) => s.nombre === e.target.value,
                    );

                    if (!matchedSitio) {
                      field.onChange(undefined);
                    }
                  }}
                  onFocus={() => setShowOptions(true)}
                />
                {showOptions && filteredSitios.length > 0 && (
                  <div className="absolute z-30 mt-1 w-full max-h-52 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                    {filteredSitios.map((s) => (
                      <div
                        key={s.idSitio}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          field.onChange(s.idSitio);
                          setQuery(s.nombre);
                          setShowOptions(false);
                        }}
                      >
                        {s.nombre}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }}
        />

        <Controller
          control={control}
          name="fkInventario"
          render={({ field }) => {
            const [query, setQuery] = useState("");
            const [showOptions, setShowOptions] = useState(false);

            const filteredInventarios =
              inventarios?.filter((i) =>
                i.nombre.toLowerCase().includes(query.toLowerCase()),
              ) || [];

            useEffect(() => {
              // Sincronizar query con el valor del campo
              if (field.value) {
                const selectedInventario = inventarios?.find(
                  (i) => i.idInventario === field.value,
                );

                if (selectedInventario) {
                  setQuery(selectedInventario.nombre);
                }
              } else {
                setQuery("");
              }
            }, [field.value, inventarios]);

            return (
              <div className="relative w-full">
                <Input
                  errorMessage={errors.fkInventario?.message}
                  isInvalid={!!errors.fkInventario}
                  label="Grupo de Inventario"
                  placeholder="Selecciona un grupo..."
                  value={query}
                  onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowOptions(true);
                    // Limpiar el valor del campo si el texto no coincide con ningún inventario
                    const matchedInventario = inventarios?.find(
                      (i) => i.nombre === e.target.value,
                    );

                    if (!matchedInventario) {
                      field.onChange(undefined);
                    }
                  }}
                  onFocus={() => setShowOptions(true)}
                />
                {showOptions && filteredInventarios.length > 0 && (
                  <div className="absolute z-30 mt-1 w-full max-h-52 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                    {filteredInventarios.map((i) => (
                      <div
                        key={i.idInventario}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          field.onChange(i.idInventario);
                          setQuery(i.nombre);
                          setShowOptions(false);
                        }}
                      >
                        {i.nombre}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }}
        />

        <Controller
          control={control}
          name="fkUnidadMedida"
          render={({ field }) => {
            const [query, setQuery] = useState("");
            const [showOptions, setShowOptions] = useState(false);

            const filteredUnidades =
              unidades?.filter(
                (u) =>
                  u.estado &&
                  u.nombre.toLowerCase().includes(query.toLowerCase()),
              ) || [];

            useEffect(() => {
              // Sincronizar query con el valor del campo
              if (field.value) {
                const selectedUnidad = unidades?.find(
                  (u) => u.idUnidad === field.value,
                );

                if (selectedUnidad) {
                  setQuery(selectedUnidad.nombre);
                }
              } else {
                setQuery("");
              }
            }, [field.value, unidades]);

            return (
              <div className="relative w-full flex items-start gap-2">
                <div className="w-full">
                  <Input
                    errorMessage={errors.fkUnidadMedida?.message}
                    isInvalid={!!errors.fkUnidadMedida}
                    label="Unidad"
                    placeholder="Selecciona una unidad..."
                    value={query}
                    onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowOptions(true);
                      // Limpiar el valor del campo si el texto no coincide con ninguna unidad
                      const matchedUnidad = unidades?.find(
                        (u) => u.nombre === e.target.value,
                      );

                      if (!matchedUnidad) {
                        field.onChange(undefined);
                      }
                    }}
                    onFocus={() => setShowOptions(true)}
                  />
                  {showOptions && filteredUnidades.length > 0 && (
                    <div className="absolute z-20 mt-1 w-80 max-h-52 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg backdrop-blur-sm">
                      {filteredUnidades.map((unidad) => (
                        <div
                          key={unidad.idUnidad}
                          className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            field.onChange(unidad.idUnidad);
                            setQuery(unidad.nombre);
                            setShowOptions(false);
                          }}
                        >
                          {unidad.nombre}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Buton
                  className="m-2 w-10 h-10 !px-0 !min-w-0 rounded-xl"
                  type="button"
                  onPress={() => setShowModal(true)}
                >
                  <PlusCircleIcon />
                </Buton>
              </div>
            );
          }}
        />

        <Controller
          control={control}
          name="fkCategoria"
          render={({ field }) => {
            const [query, setQuery] = useState("");
            const [showOptions, setShowOptions] = useState(false);

            const filteredCategorias =
              categorias?.filter(
                (c) =>
                  c.estado &&
                  c.nombre.toLowerCase().includes(query.toLowerCase()),
              ) || [];

            useEffect(() => {
              // Sincronizar query con el valor del campo
              if (field.value) {
                const selectedCategoria = categorias?.find(
                  (c) => c.idCategoria === field.value,
                );

                if (selectedCategoria) {
                  setQuery(selectedCategoria.nombre);
                }
              } else {
                setQuery("");
              }
            }, [field.value, categorias]);

            return (
              <div className="relative w-full flex items-start gap-2">
                <div className="w-full">
                  <Input
                    errorMessage={errors.fkCategoria?.message}
                    isInvalid={!!errors.fkCategoria}
                    label="Categoría"
                    placeholder="Selecciona una categoría..."
                    value={query}
                    onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowOptions(true);
                      // Limpiar el valor del campo si el texto no coincide con ninguna categoría
                      const matchedCategoria = categorias?.find(
                        (c) => c.nombre === e.target.value,
                      );

                      if (!matchedCategoria) {
                        field.onChange(undefined);
                      }
                    }}
                    onFocus={() => setShowOptions(true)}
                  />
                  {showOptions && filteredCategorias.length > 0 && (
                    <div className="absolute z-20 mt-1 w-80 max-h-52 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg backdrop-blur-sm">
                      {filteredCategorias.map((cat) => (
                        <div
                          key={cat.idCategoria}
                          className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            field.onChange(cat.idCategoria);
                            setQuery(cat.nombre);
                            setShowOptions(false);
                          }}
                        >
                          {cat.nombre}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Buton
                  className="m-2 w-10 h-10 !px-0 !min-w-0 rounded-xl"
                  type="button"
                  onPress={() => setShowModalCategoria(true)}
                >
                  <PlusCircleIcon />
                </Buton>
              </div>
            );
          }}
        />

        <Checkbox
          className="mb-2"
          isSelected={tieneCaracteristica}
          onChange={(e) => setTieneCaracteristica(e.target.checked)}
        >
          ¿Posee características?
        </Checkbox>

        {tieneCaracteristica && (
          <div className="flex items-end gap-2 w-full">
            <Controller
              control={control}
              name="fkCaracteristica"
              render={({ field }) => {
                const [query, setQuery] = useState("");
                const [showOptions, setShowOptions] = useState(false);

                const filteredCaracteristicas =
                  caracteristicas?.filter((c) =>
                    c.nombre?.toLowerCase().includes(query.toLowerCase()),
                  ) || [];

                useEffect(() => {
                  // Sincronizar query con el valor del campo
                  if (field.value) {
                    const selectedCaracteristica = caracteristicas?.find(
                      (c) => c.idCaracteristica === field.value,
                    );

                    if (selectedCaracteristica) {
                      setQuery(selectedCaracteristica.nombre as string);
                    }
                  } else {
                    setQuery("");
                  }
                }, [field.value, caracteristicas]);

                return (
                  <div className="relative w-full flex items-start gap-2">
                    <div className="w-full">
                      <Input
                        errorMessage={errors.fkCaracteristica?.message}
                        isInvalid={!!errors.fkCaracteristica}
                        label="Característica"
                        placeholder="Selecciona una característica..."
                        value={query}
                        onBlur={() =>
                          setTimeout(() => setShowOptions(false), 150)
                        }
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setShowOptions(true);
                          // Limpiar el valor del campo si el texto no coincide con ninguna característica
                          const matchedCaracteristica = caracteristicas?.find(
                            (c) => c.nombre === e.target.value,
                          );

                          if (!matchedCaracteristica) {
                            field.onChange(undefined);
                          }
                        }}
                        onFocus={() => setShowOptions(true)}
                      />
                      {showOptions && filteredCaracteristicas.length > 0 && (
                        <div className="absolute z-20 mt-1 w-80 max-h-52 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg backdrop-blur-sm">
                          {filteredCaracteristicas.map((car) => (
                            <div
                              key={car.idCaracteristica}
                              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                field.onChange(car.idCaracteristica);
                                setQuery(car.nombre as string);
                                setShowOptions(false);
                              }}
                            >
                              {car.nombre}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }}
            />
            <Buton
              className="mb-3 w-10 h-10 !px-0 !min-w-0 rounded-xl"
              type="button"
              onPress={() => setShowModalCaracteristica(true)}
            >
              <PlusCircleIcon />
            </Buton>
          </div>
        )}
      </Form>

      <Modal
        ModalTitle="Agregar Unidad"
        isOpen={showModal}
        onOpenChange={handleClose}
      >
        <FormularioUnidades
          addData={async (data) => {
            await addUnidad(data);
          }}
          id="unidad"
          onClose={() => setShowModal(false)}
        />
        <Buton form="unidad" text="Guardar" type="submit" />
      </Modal>

      <Modal
        ModalTitle="Agregar Categoría"
        isOpen={showModalCategoria}
        onOpenChange={handleCloseCategoria}
      >
        <FormCategorias
          addData={async (data) => {
            await addCategoria(data);
          }}
          id="categoria"
          onClose={() => setShowModalCategoria(false)}
        />
        <Buton form="categoria" text="Guardar" type="submit" />
      </Modal>

      <Modal
        ModalTitle="Agregar Característica"
        isOpen={showModalCaracteristica}
        onOpenChange={handleCloseCaracteristica}
      >
        <FormularioCaracteristicas
          addData={async (data) => {
            await addCaracteristica(data);
          }}
          id="caracteristica"
          onClose={() => setShowModalCaracteristica(false)}
        />
        <Buton form="caracteristica" text="Guardar" type="submit" />
      </Modal>
    </>
  );
}
