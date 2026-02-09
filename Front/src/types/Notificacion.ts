export type NotificacionEstado = "aceptado" | "cancelado" | "enProceso" | null;

export type Notificacion = {
  idNotificacion: number;
  titulo: string;
  mensaje: string | null;
  leido: boolean;
  requiereAccion: boolean;
  estado: NotificacionEstado;
  data: {
    idElemento?: number;
    [key: string]: any;
  } | null;
  createdAt: string;
  fkUsuario: {
    idUsuario: number;
    nombre: string;
  };
};
