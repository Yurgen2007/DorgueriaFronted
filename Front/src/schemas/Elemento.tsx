import { z } from "zod";

export const ElementoUpdateSchema = z.object({
  idElemento: z.number(),
  nombre: z
    .string()
    .min(1, { message: "Nombre es requerido" })
    .min(2, { message: "Debe contener como mínimo 2 caracteres" }),
  descripcion: z
    .string()
    .min(1, { message: "Descripción es requerida" })
    .min(2, { message: "Longitud mínima 2" }),
  estado: z.boolean({ required_error: "Estado es requerido" }),
  imagen: z
    .any()
    .refine(
      (file) =>
        file === undefined || file instanceof File || typeof file === "string",
      {
        message: "La imagen debe ser un archivo o una URL válida",
      }
    )
    .optional()
    .nullable(),
  fkUnidadMedida: z.number({ required_error: "Unidad es requerida" }),
  fkCategoria: z.number({ required_error: "Categoría es requerida" }),
  fkCaracteristica: z.number().optional().nullable(),
  fechaVencimiento: z.string().optional().nullable(),
  fkSitio: z.number({ required_error: "Sitio es requerido" }),
  fkInventario: z.number({ required_error: "Inventario es requerido" }),
  stock: z.coerce.number(),
});

export type ElementoUpdate = z.infer<typeof ElementoUpdateSchema>;

export const ElementoCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "Nombre es requerido" })
    .min(2, { message: "Debe contener como mínimo 2 caracteres" }),
  descripcion: z
    .string()
    .min(1, { message: "Descripción es requerida" })
    .min(2, { message: "Longitud mínima 2" }),
  estado: z.boolean({ required_error: "Estado es requerido" }),
  imagen: z
    .any()
    .refine(
      (file) =>
        file === undefined || file instanceof File || typeof file === "string",
      {
        message: "La imagen debe ser un archivo o una URL válida",
      }
    )
    .optional()
    .nullable(),
  fkUnidadMedida: z.number({ required_error: "Unidad es requerida" }).refine(val => val !== null && val !== undefined && !isNaN(val), {
    message: "Unidad es requerida",
  }),
  fkCategoria: z.number({ required_error: "Categoría es requerida" }).refine(val => val !== null && val !== undefined && !isNaN(val), {
    message: "Categoría es requerida",
  }),
  fkCaracteristica: z.number().optional().nullable(),
  fechaVencimiento: z.string().optional().nullable(),
  fkSitio: z.number({ required_error: "Sitio es requerido" }).refine(val => val !== null && val !== undefined && !isNaN(val), {
    message: "Sitio es requerido",
  }),
  fkInventario: z.number({ required_error: "Inventario es requerido" }).refine(val => val !== null && val !== undefined && !isNaN(val), {
    message: "Inventario es requerido",
  }),
  stock: z.coerce.number(),
});

export type ElementoCreate = z.infer<typeof ElementoCreateSchema>;
