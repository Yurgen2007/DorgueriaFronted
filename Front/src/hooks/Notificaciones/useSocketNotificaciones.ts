import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

import { Notificacion } from "@/types/Notificacion";

const SOCKET_URL = import.meta.env.VITE_SOCKET_BASE_URL;

export function useSocketNotificaciones(
  usuarioId: number,
  onNotificacion: (noti: Notificacion) => void,
) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!usuarioId || usuarioId <= 0) {
      console.warn("⚠️ ID de usuario no válido para el socket:", usuarioId);

      return;
    }

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      query: {
        idUsuario: usuarioId.toString(),
      },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Conectado al socket:", socket.id);
      socket.emit("join", `usuario_${usuarioId}`);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Error de conexión Socket.IO:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Desconectado del socket:", reason);
    });

    socket.on("nuevaNotificacion", (noti: Notificacion) => {
      console.log("📥 Notificación recibida:", noti);
      onNotificacion(noti);
    });

    return () => {
      console.log("🔌 Desmontando y cerrando socket...");
      socket.disconnect();
    };
  }, [usuarioId, onNotificacion]);

  return socketRef;
}
