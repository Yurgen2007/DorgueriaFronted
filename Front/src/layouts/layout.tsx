import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "@/components/templates/sidebar";
import { Nav } from "@/components/templates/Navbar";
import { DarkMode } from "@/components/molecules/DarkMode";
import NotificacionesPanel from "@/components/templates/NotificacionesPanel";
import { useAuth } from "@/providers/AuthProvider";
import { useSocketNotificaciones } from "@/hooks/Notificaciones/useSocketNotificaciones";
import { useNotificaciones } from "@/hooks/Notificaciones/useNotificaciones";
import usePermissions from "@/hooks/Usuarios/usePermissions";

export default function Layout() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { idUsuario } = useAuth();
  const { userHasPermission } = usePermissions();

  const { notificaciones } = useNotificaciones(idUsuario!);
  const cantidadNoLeidas = notificaciones?.filter((n) => !n.leido).length ?? 0;

  // Solo mostrar notificaciones para Administrador (tiene permiso 71 - Exportar PDF)
  const isAdmin = userHasPermission(71);

  useEffect(() => {
    if (idUsuario) {
      console.log("✅ idUsuario disponible:", idUsuario);
    }
  }, [idUsuario]);

  useSocketNotificaciones(idUsuario!, (noti) => {
    console.log("🔔 Nueva notificación:", noti);
  });

  if (!idUsuario) {
    return <div className="text-center mt-10">🔄 Cargando usuario...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden dark:bg-zinc-900 text-black dark:text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-200 dark:bg-zinc-900 text-black dark:text-white">
        <Nav
          cantidadNoLeidas={cantidadNoLeidas}
          onOpenNotifications={() => setIsNotifOpen(true)}
          showNotifications={isAdmin}
        >
          <DarkMode />
        </Nav>

        <Outlet />

        {isAdmin && (
          <NotificacionesPanel
            open={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        )}
      </main>
    </div>
  );
}
