import { z } from "zod";

export const InventarioUpdateSchema = z.object({
  idInventario: z.number().optional(),
  nombre: z.string().min(1, { message: "Nombre es requerido" }),
  estado: z.boolean().optional(),
});

export type InventarioUpdate = z.infer<typeof InventarioUpdateSchema>;

export const InventarioCreateSchema = z.object({
  nombre: z.string().min(1, { message: "Nombre es requerido" }),
  estado: z.boolean({ required_error: "Estado es requerido" }).default(true),
});

export type InventarioCreate = z.infer<typeof InventarioCreateSchema>;
