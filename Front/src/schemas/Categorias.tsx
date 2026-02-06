import { z } from "zod";

export const CategoriaSchema = z.object({
  idCategoria: z.number().optional(),
  nombre: z
    .string()
    .min(1, { message: "Es necesario un nombre" })
    .min(2, "Mínimo 2 caracteres"),
  estado: z.boolean({ required_error: "Estado es requerido" }),
});

export type Categoria = z.infer<typeof CategoriaSchema>;

export const CategoriaUpdateSchema = z.object({
  idCategoria: z.number().optional(),
  nombre: z
    .string()
    .min(1, { message: "Es necesario un nombre" })
    .min(4, { message: "Mínimo 4 caracteres" }),
});

export type CategoriaUpdate = z.infer<typeof CategoriaUpdateSchema>;
