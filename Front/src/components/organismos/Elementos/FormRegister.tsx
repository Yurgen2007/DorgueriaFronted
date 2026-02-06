import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnidad } from "@/hooks/UnidadesMedida/useUnidad";
import { useCategoria } from "@/hooks/Categorias/useCategorias";
import { useCaracteristica } from "@/hooks/Caracteristicas/useCaracteristicas";
import { useSitios } from "@/hooks/sitios/useSitios";
import { useInventario } from "@/hooks/Inventarios/useInventario";
import { Form } from "@heroui/form";
import { addToast, Checkbox, Input } from "@heroui/react";
import { ElementoCreate, ElementoCreateSchema } from "@/schemas/Elemento";
import { useEffect, useState } from "react";
import Buton from "@/components/molecules/Button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Modal from "../modal";
import FormularioUnidades from "../UnidadesMedida/FormRegister";
import FormCategorias from "../Categorias/FormCategorias";
import FormularioCaracteristicas from "../Caracteristicas/FormRegister";

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
        fkCaracteristica: tieneCaracteristica ? (data as ElementoCreate).fkCaracteristica : undefined,
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
        id={id}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4"
      >
        <Input
          label="Nombre"
          placeholder="Nombre"
          {...register("nombre")}
          isInvalid={!!errors.nombre}
          errorMessage={errors.nombre?.message}
        />
        <Input
          label="Descripción"
          placeholder="Descripción"
          {...register("descripcion")}
          isInvalid={!!errors.descripcion}
          errorMessage={errors.descripcion?.message}
        />

        <Input
          type="date"
          label="Fecha de Vencimiento"
          {...register("fechaVencimiento")}
          isInvalid={!!errors.fechaVencimiento}
          errorMessage={errors.fechaVencimiento?.message}
        />

        <Input
          label="Imagen"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? undefined;
            setValue("imagen", file);
          }}
        />

        <Input
          label="Stock Inicial"
          type="number"
          placeholder="0"
          {...register("stock", { valueAsNumber: true })}
          isInvalid={!!errors.stock}
          errorMessage={errors.stock?.message}
        />

        <Controller
          control={control}
          name="fkSitio"
          render={({ field }) => {
            const [query, setQuery] = useState("");
            const [showOptions, setShowOptions] = useState(false);

            const filteredSitios = sitios?.filter(s => s.nombre.toLowerCase().includes(query.toLowerCase())) || [];

            useEffect(() => {
              // Sincronizar query con el valor del campo
              if (field.value) {
                const selectedSitio = sitios?.find(s => s.idSitio === field.value);
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
                  label="Sitio (Ubicación física)"
                  placeholder="Selecciona un sitio..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowOptions(true);
                    // Limpiar el valor del campo si el texto no coincide con ningún sitio
                    const matchedSitio = sitios?.find(s => s.nombre === e.target.value);
                    if (!matchedSitio) {
                      field.onChange(undefined);
                    }
                  }}
                  onFocus={() => setShowOptions(true)}
                  onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                  isInvalid={!!errors.fkSitio}
                  errorMessage={errors.fkSitio?.message}
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

            const filteredInventarios = inventarios?.filter(i => i.nombre.toLowerCase().includes(query.toLowerCase())) || [];

            useEffect(() => {
              // Sincronizar query con el valor del campo
              if (field.value) {
                const selectedInventario = inventarios?.find(i => i.idInventario === field.value);
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
                  label="Grupo de Inventario"
                  placeholder="Selecciona un grupo..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowOptions(true);
                    // Limpiar el valor del campo si el texto no coincide con ningún inventario
                    const matchedInventario = inventarios?.find(i => i.nombre === e.target.value);
                    if (!matchedInventario) {
                      field.onChange(undefined);
                    }
                  }}
                  onFocus={() => setShowOptions(true)}
                  onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                  isInvalid={!!errors.fkInventario}
                  errorMessage={errors.fkInventario?.message}
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

            const filteredUnidades = unidades?.filter(u => u.estado && u.nombre.toLowerCase().includes(query.toLowerCase())) || [];

            useEffect(() => {
              // Sincronizar query con el valor del campo
              if (field.value) {
                const selectedUnidad = unidades?.find(u => u.idUnidad === field.value);
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
                    label="Unidad"
                    placeholder="Selecciona una unidad..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowOptions(true);
                      // Limpiar el valor del campo si el texto no coincide con ninguna unidad
                      const matchedUnidad = unidades?.find(u => u.nombre === e.target.value);
                      if (!matchedUnidad) {
                        field.onChange(undefined);
                      }
                    }}
                    onFocus={() => setShowOptions(true)}
                    onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                    isInvalid={!!errors.fkUnidadMedida}
                    errorMessage={errors.fkUnidadMedida?.message}
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
                <Buton type="button" className="m-2 w-10 h-10 !px-0 !min-w-0 rounded-xl" onPress={() => setShowModal(true)}>
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

            const filteredCategorias = categorias?.filter(c => c.estado && c.nombre.toLowerCase().includes(query.toLowerCase())) || [];

            useEffect(() => {
              // Sincronizar query con el valor del campo
              if (field.value) {
                const selectedCategoria = categorias?.find(c => c.idCategoria === field.value);
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
                    label="Categoría"
                    placeholder="Selecciona una categoría..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowOptions(true);
                      // Limpiar el valor del campo si el texto no coincide con ninguna categoría
                      const matchedCategoria = categorias?.find(c => c.nombre === e.target.value);
                      if (!matchedCategoria) {
                        field.onChange(undefined);
                      }
                    }}
                    onFocus={() => setShowOptions(true)}
                    onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                    isInvalid={!!errors.fkCategoria}
                    errorMessage={errors.fkCategoria?.message}
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
                <Buton type="button" className="m-2 w-10 h-10 !px-0 !min-w-0 rounded-xl" onPress={() => setShowModalCategoria(true)}>
                  <PlusCircleIcon />
                </Buton>
              </div>
            );
          }}
        />

        <Checkbox
          isSelected={tieneCaracteristica}
          onChange={(e) => setTieneCaracteristica(e.target.checked)}
          className="mb-2"
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

                const filteredCaracteristicas = caracteristicas?.filter(c => c.nombre?.toLowerCase().includes(query.toLowerCase())) || [];

                useEffect(() => {
                  // Sincronizar query con el valor del campo
                  if (field.value) {
                    const selectedCaracteristica = caracteristicas?.find(c => c.idCaracteristica === field.value);
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
                        label="Característica"
                        placeholder="Selecciona una característica..."
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setShowOptions(true);
                          // Limpiar el valor del campo si el texto no coincide con ninguna característica
                          const matchedCaracteristica = caracteristicas?.find(c => c.nombre === e.target.value);
                          if (!matchedCaracteristica) {
                            field.onChange(undefined);
                          }
                        }}
                        onFocus={() => setShowOptions(true)}
                        onBlur={() => setTimeout(() => setShowOptions(false), 150)}
                        isInvalid={!!errors.fkCaracteristica}
                        errorMessage={errors.fkCaracteristica?.message}
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
            <Buton type="button" className="mb-3 w-10 h-10 !px-0 !min-w-0 rounded-xl" onPress={() => setShowModalCaracteristica(true)}>
              <PlusCircleIcon />
            </Buton>
          </div>
        )}
      </Form>

      <Modal ModalTitle="Agregar Unidad" isOpen={showModal} onOpenChange={handleClose}>
        <FormularioUnidades
          id="unidad"
          onClose={() => setShowModal(false)}
          addData={async (data) => { await addUnidad(data); }}
        />
        <Buton form="unidad" text="Guardar" type="submit" />
      </Modal>

      <Modal ModalTitle="Agregar Categoría" isOpen={showModalCategoria} onOpenChange={handleCloseCategoria}>
        <FormCategorias
          id="categoria"
          onClose={() => setShowModalCategoria(false)}
          addData={async (data) => { await addCategoria(data); }}
        />
        <Buton form="categoria" text="Guardar" type="submit" />
      </Modal>

      <Modal ModalTitle="Agregar Característica" isOpen={showModalCaracteristica} onOpenChange={handleCloseCaracteristica}>
        <FormularioCaracteristicas
          id="caracteristica"
          onClose={() => setShowModalCaracteristica(false)}
          addData={async (data) => { await addCaracteristica(data); }}
        />
        <Buton form="caracteristica" text="Guardar" type="submit" />
      </Modal>
    </>
  );
}
