import { Input } from "@heroui/input";
import { useForm } from "react-hook-form";
import { Form } from "@heroui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast, Select, SelectItem } from "@heroui/react";
import { ElementoUpdateSchema, ElementoUpdate } from "@/schemas/Elemento";
import { useElemento } from "@/hooks/Elementos/useElemento";
import { Elemento } from "@/types/Elemento";
import Buton from "@/components/molecules/Button";
import { useUnidad } from "@/hooks/UnidadesMedida/useUnidad";
import { useCategoria } from "@/hooks/Categorias/useCategorias";
import { useCaracteristica } from "@/hooks/Caracteristicas/useCaracteristicas";
import { useSitios } from "@/hooks/sitios/useSitios";
import { useInventario } from "@/hooks/Inventarios/useInventario";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Modal from "../modal";
import FormularioUnidades from "../UnidadesMedida/FormRegister";
import FormCategorias from "../Categorias/FormCategorias";
import FormularioCaracteristicas from "../Caracteristicas/FormRegister";
import { useState } from "react";

type Props = {
  elementos: Elemento[];
  elementoId: number;
  id: string;
  onclose: () => void;
};

export const FormUpdate = ({ elementos, elementoId, id, onclose }: Props) => {
  const { updateElemento, getElementoById } = useElemento();
  const { unidades, addUnidad } = useUnidad() as any;
  const { categorias, addCategoria } = useCategoria() as any;
  const { caracteristicas, addCaracteristica } = useCaracteristica() as any;
  const { sitios } = useSitios();
  const { inventarios } = useInventario();

  const [showModal, setShowModal] = useState(false);
  const [showModalCategoria, setShowModalCategoria] = useState(false);
  const [showModalCaracteristica, setShowModalCaracteristica] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleCloseCategoria = () => setShowModalCategoria(false);
  const handleCloseCaracteristica = () => setShowModalCaracteristica(false);

  const foundElemento = getElementoById(elementoId, elementos) as any;

  const normalizedElemento: ElementoUpdate = {
    idElemento: foundElemento?.idElemento || 0,
    nombre: foundElemento?.nombre || "",
    descripcion: foundElemento?.descripcion || "",
    estado: foundElemento?.estado ?? true,
    imagen: foundElemento?.imagen,
    fechaVencimiento: foundElemento?.fechaVencimiento,
    fkUnidadMedida: typeof foundElemento?.fkUnidadMedida === "object" ? foundElemento.fkUnidadMedida.idUnidad : foundElemento?.fkUnidadMedida,
    fkCategoria: typeof foundElemento?.fkCategoria === "object" ? foundElemento.fkCategoria.idCategoria : foundElemento?.fkCategoria,
    fkCaracteristica: typeof foundElemento?.fkCaracteristica === "object" ? foundElemento.fkCaracteristica.idCaracteristica : foundElemento?.fkCaracteristica,
    fkSitio: typeof foundElemento?.fkSitio === "object" ? foundElemento.fkSitio.idSitio : foundElemento?.fkSitio,
    fkInventario: typeof foundElemento?.fkInventario === "object" ? foundElemento.fkInventario.idInventario : foundElemento?.fkInventario,
    stock: foundElemento?.stock ?? 0,
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ElementoUpdate>({
    resolver: zodResolver(ElementoUpdateSchema),
    mode: "onChange",
    defaultValues: normalizedElemento,
  });

  const fkUnidadMedida = watch("fkUnidadMedida");
  const fkCategoria = watch("fkCategoria");
  const fkCaracteristica = watch("fkCaracteristica");
  const imagen = watch("imagen");

  const onSubmit = async (data: any) => {
    if (!data.idElemento) return;
    try {
      await updateElemento(data.idElemento, data as ElementoUpdate);
      onclose();
      addToast({
        title: "Elemento actualizado",
        description: "Los datos del elemento fueron actualizados correctamente.",
        color: "primary",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.error("Error al actualizar el Elemento", error);
    }
  };

  return (
    <>
      <Form id={id} className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nombre"
          placeholder="Nombre del elemento"
          {...register("nombre")}
          isInvalid={!!errors.nombre}
          errorMessage={errors.nombre?.message}
        />
        <Input
          label="Descripción"
          placeholder="Descripción del elemento"
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

        {imagen && typeof imagen === "string" && (
          <div className="flex justify-center">
            <img
              src={`${import.meta.env.VITE_API_CLIENT?.replace(/\/$/, '') || 'http://localhost:3000'}/img/elementos/${imagen}`}
              alt="Imagen actual"
              className="w-40 h-40 object-cover rounded-lg mb-4"
              onError={(e) => {
                // Si falla, intentar con la imagen por defecto
                e.currentTarget.src = `${import.meta.env.VITE_API_CLIENT?.replace(/\/$/, '') || 'http://localhost:3000'}/img/elementos/defaultElemento.png`;
              }}
            />
          </div>
        )}

        <Input
          label="Imagen"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setValue("imagen", file);
          }}
        />

        {unidades && (
          <div className="w-full flex">
            <Select
              label="Unidad de medida"
              selectedKeys={fkUnidadMedida ? [fkUnidadMedida.toString()] : []}
              onSelectionChange={(keys) => {
                const key = [...keys][0];
                setValue("fkUnidadMedida", key ? parseInt(key as string) : (undefined as any));
              }}
            >
              {unidades.map((u: any) => (
                <SelectItem key={u.idUnidad?.toString()} textValue={u.nombre}>
                  {u.nombre}
                </SelectItem>
              ))}
            </Select>
            <Buton type="button" className="m-2 w-10 h-10 !px-0 !min-w-0 rounded-xl" onPress={() => setShowModal(true)}>
              <PlusCircleIcon />
            </Buton>
          </div>
        )}

        {categorias && (
          <div className="w-full flex">
            <Select
              label="Categoría"
              selectedKeys={fkCategoria ? [fkCategoria.toString()] : []}
              onSelectionChange={(keys) => {
                const key = [...keys][0];
                setValue("fkCategoria", key ? parseInt(key as string) : (undefined as any));
              }}
            >
              {categorias.map((c: any) => (
                <SelectItem key={c.idCategoria?.toString()} textValue={c.nombre}>
                  {c.nombre}
                </SelectItem>
              ))}
            </Select>
            <Buton type="button" className="m-2 w-10 h-10 !px-0 !min-w-0 rounded-xl" onPress={() => setShowModalCategoria(true)}>
              <PlusCircleIcon />
            </Buton>
          </div>
        )}

        {sitios && (
          <div className="w-full flex">
            <Select
              label="Sitio (Ubicación física)"
              selectedKeys={watch("fkSitio") ? [watch("fkSitio")!.toString()] : []}
              onSelectionChange={(keys) => {
                const key = [...keys][0];
                setValue("fkSitio", key ? parseInt(key as string) : (undefined as any));
              }}
            >
              {sitios.map((s: any) => (
                <SelectItem key={s.idSitio?.toString()} textValue={s.nombre}>
                  {s.nombre}
                </SelectItem>
              ))}
            </Select>
          </div>
        )}

        {inventarios && (
          <div className="w-full flex">
            <Select
              label="Grupo de Inventario (Opcional)"
              selectedKeys={watch("fkInventario") ? [watch("fkInventario")!.toString()] : []}
              onSelectionChange={(keys) => {
                const key = [...keys][0];
                setValue("fkInventario", key ? parseInt(key as string) : (null as any));
              }}
            >
              {inventarios.map((i: any) => (
                <SelectItem key={i.idInventario?.toString()} textValue={i.nombre}>
                  {i.nombre}
                </SelectItem>
              ))}
            </Select>
          </div>
        )}

        {caracteristicas && (
          <div className="w-full flex">
            <Select
              label="Característica"
              selectedKeys={fkCaracteristica ? [fkCaracteristica.toString()] : []}
              onSelectionChange={(keys) => {
                const key = [...keys][0];
                setValue("fkCaracteristica", key ? parseInt(key as string) : (null as any));
              }}
            >
              {caracteristicas.map((car: any) => (
                <SelectItem key={car.idCaracteristica?.toString()} textValue={car.nombre}>
                  {car.nombre}
                </SelectItem>
              ))}
            </Select>
            <Buton type="button" className="m-2 w-10 h-10 !px-0 !min-w-0 rounded-xl" onPress={() => setShowModalCaracteristica(true)}>
              <PlusCircleIcon />
            </Buton>
          </div>
        )}

        <Buton
          text="Guardar"
          type="submit"
          isLoading={isSubmitting}
          className="w-full rounded-xl"
        />
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
};
