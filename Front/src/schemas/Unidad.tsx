import { z } from "zod";

export const UnidadUpdateSchema = z.object({
  idUnidad: z.number().optional(),

  nombre: z
    .string()
    .min(1, { message: "Nombre es  requerido" })
    .min(2, { message: "Debe contener como mimimo 2 caracteres" }),
});

export type UnidadUpdate = z.infer<typeof UnidadUpdateSchema>;

export const UnidadCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "Nombre es  requerido" })
    .min(2, { message: "Debe contener como mimimo 2 caracteres" }),

  estado: z.boolean({ required_error: "Estado es requerido" }),
});
export type UnidadCreate = z.infer<typeof UnidadCreateSchema>;
