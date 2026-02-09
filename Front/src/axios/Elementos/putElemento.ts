import { axiosAPI } from "../axiosAPI";

export interface ElementoPutData {
  nombre: string;
  descripcion: string;
  estado: boolean;
  imagen?: string | File | undefined;
  fkUnidadMedida?: number;
  fkCategoria?: number;
  fkCaracteristica?: number | null;
  fkSitio?: number;
  fkInventario?: number | null;
  codigoBarras: string;
  fechaVencimiento?: string | null;
  stock?: number;
}

export async function putElemento(
  id: number,
  data: ElementoPutData,
): Promise<any> {
  const formData = new FormData();

  formData.append("nombre", data.nombre);
  formData.append("descripcion", data.descripcion);
  formData.append("estado", data.estado.toString());
  formData.append("codigoBarras", data.codigoBarras || "");
  if (data.fechaVencimiento !== undefined) {
    formData.append("fechaVencimiento", data.fechaVencimiento || "");
  }
  if (data.stock !== undefined) {
    formData.append("stock", data.stock.toString());
  }
  if (data.imagen) {
    formData.append("imagen", data.imagen);
  }
  if (data.fkUnidadMedida) {
    formData.append("fkUnidadMedida", data.fkUnidadMedida.toString());
  }
  if (data.fkCategoria) {
    formData.append("fkCategoria", data.fkCategoria.toString());
  }
  if (data.fkCaracteristica) {
    formData.append("fkCaracteristica", data.fkCaracteristica.toString());
  }
  if (data.fkSitio) {
    formData.append("fkSitio", data.fkSitio.toString());
  }
  if (data.fkInventario) {
    formData.append("fkInventario", data.fkInventario.toString());
  }
  const res = await axiosAPI.patch(`elementos/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}
