import { z } from "zod";

export const RolUpdateSchema = z.object({
  idRol: z.number(),

  nombre: z
    .string()
    .min(1, { message: "Nombre es  requerido" })
    .min(3, { message: "Debe contener como mimimo 3 caracteres" }),
});

export type RolUpdate = z.infer<typeof RolUpdateSchema>;

export const RolCreateSchema = z.object({
  idRol: z.number().optional(),
  nombre: z
    .string()
    .min(1, { message: "Nombre es  requerido" })
    .min(3, { message: "Debe contener como mimimo 3 caracteres" }),

  estado: z.boolean({ required_error: "Estado es requerido" }),
});
export type RolCreate = z.infer<typeof RolCreateSchema>;
