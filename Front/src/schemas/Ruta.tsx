import { z } from "zod";

export const RutaSchema = z.object({
  idRuta: z.number(),
  nombre: z
    .string({ required_error: "Nombre es requerido" })
    .min(3, "Mínimo 3 caracteres"),
  descripcion: z
    .string({ required_error: "Descripción requerida" })
    .min(3, "Mínimo 3 caracteres"),
  urlDestino: z.string().min(8, "Mínimo 8 caracteres"),
  estado: z.boolean({ required_error: "Estado es requerido" }),
  fkModulo: z.number({ required_error: "Módulo requerido" }),
});

export type Ruta = z.infer<typeof RutaSchema>;

export const RutaUpdateSchema = z.object({
  idRuta: z.number(),
  nombre: z
    .string({ required_error: "Nombre es requerido" })
    .min(3, "Mínimo 3 caracteres"),
  descripcion: z
    .string({ required_error: "Descripción requerida" })
    .min(3, "Mínimo 3 caracteres"),
  urlDestino: z.string().min(8, "Mínimo 8 caracteres"),
});

export type RutaUpdate = z.infer<typeof RutaUpdateSchema>;
