import { z } from "zod";

export const ModuloSchema = z.object({
  idModulo: z.number(),
  nombre: z
    .string()
    .min(1, { message: "Es necesario un nombre" })
    .min(3, "Mínimo 3 caracteres"),
  estado: z.boolean({ required_error: "Estado es requerido" }),
  descripcion: z
    .string()
    .min(1, { message: "Es necesario una descripcion" })
    .min(3, "Mínimo 3 caracteres"),
});

export type Modulo = z.infer<typeof ModuloSchema>;

export const ModuloUpdateSchema = z.object({
  idModulo: z.number(),
  nombre: z
    .string()
    .min(1, { message: "Es necesario un nombre" })
    .min(3, "Mínimo 3 caracteres"),
  descripcion: z
    .string()
    .min(1, { message: "Es necesario una descripcion" })
    .min(3, "Mínimo 3 caracteres"),
});

export type ModuloUpdate = z.infer<typeof ModuloUpdateSchema>;
