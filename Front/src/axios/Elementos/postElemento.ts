import { axiosAPI } from "../axiosAPI";

export interface ElementoPostData {
  nombre: string;
  descripcion: string;
  codigoBarras?: string;
  perecedero?: boolean;
  noPerecedero?: boolean;
  estado?: boolean;
  fechaVencimiento?: string | null;
  imagen?: string | File;
  fkUnidadMedida: number;
  fkCategoria: number;
  fkCaracteristica?: number | null;
  fkSitio: number;
  fkInventario: number;
  stock?: number;
}

export async function postElemento(data: ElementoPostData): Promise<any> {
  const formData = new FormData();

  formData.append("nombre", data.nombre);
  formData.append("descripcion", data.descripcion);
  formData.append("estado", data.estado ? "true" : "false");
  formData.append("perecedero", data.perecedero ? "true" : "false");
  formData.append("noPerecedero", data.noPerecedero ? "true" : "false");
  if (data.fechaVencimiento) {
    formData.append("fechaVencimiento", data.fechaVencimiento.toString());
  }
  if (data.codigoBarras) {
    formData.append("codigoBarras", data.codigoBarras);
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
  if (data.stock !== undefined) {
    formData.append("stock", data.stock.toString());
  }
  if (data.imagen) {
    formData.append("imagen", data.imagen);
  }

  console.log("Enviando:", [...formData.entries()]);

  const res = await axiosAPI.post("elementos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const id = res.data?.idElemento;

  if (typeof id !== "number") {
    throw new Error("La respuesta del backend no contiene un id válido");
  }

  return { idElemento: id };
}
