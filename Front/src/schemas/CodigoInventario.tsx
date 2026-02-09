import { z } from "zod";

export const CodigoInventarioUpdateSchema = z.object({
  idCodigoInventario: z
    .number({
      required_error: "El ID del código es obligatorio",
    })
    .optional(),
  codigo: z
    .string({
      required_error: "El código es obligatorio",
    })
    .min(1, "El código no puede estar vacío")
    .optional(),
});

export type CodigoInventarioUpdate = z.infer<
  typeof CodigoInventarioUpdateSchema
>;
