import { MovimientoCreate } from "@/schemas/Movimento";
import { MovimientoPostData } from "@/axios/Movimentos/postMovimiento";

export function mapMovimiento(data: MovimientoCreate): MovimientoPostData {
  return {
    descripcion: data.descripcion,
    cantidad: data.cantidad ?? 0,
    horaIngreso: data.horaIngreso ?? "",
    horaSalida: data.horaSalida ?? "",
    devolutivo: data.tipo_bien === "devolutivo",
    noDevolutivo: data.tipo_bien === "no_devolutivo",
    fkUsuario: data.fkUsuario,
    fkTipoMovimiento: data.fkTipoMovimiento,
    fkSitio: data.fkSitio,
    fkInventario: data.fkInventario ?? undefined,
    fkElemento: data.fkElemento ?? undefined,
    fechaDevolucion: data.fechaDevolucion
      ? new Date(data.fechaDevolucion)
      : undefined,
    codigos: data.codigos ?? [],
    createdAt: undefined,
    updatedAt: undefined,
    lugarDestino: data.lugarDestino
  };
}