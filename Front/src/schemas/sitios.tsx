import { z } from "zod";

export const sitioUpdateSchema = z.object({
  idSitio: z.number(),
  nombre: z
    .string()
    .min(1, { message: "Nombre es requerido" })
    .min(3, { message: "Longitud mínima de 3" }),
  estante: z.string().optional(),
  pasillo: z.string().optional(),
});

export type sitioUpdate = z.infer<typeof sitioUpdateSchema>;

export const sitioCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "Nombre es requerido" })
    .min(3, { message: "Longitud mínima de 3" }),
  estante: z.string().optional(),
  pasillo: z.string().optional(),
  // removing fkTipoSitio and fkArea as they no longer exist in backend sitios table
});

export type sitioCreate = z.infer<typeof sitioCreateSchema>;
