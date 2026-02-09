import { useAuth } from "@/providers/AuthProvider";

export default function usePermissions() {
  const { permissions } = useAuth();

  const allPermissions = permissions
    .flatMap((module) => module.rutas)
    .flatMap((route) => route.permisos);

  function userHasPermission(id_permiso: number) {
    const hasPermission = allPermissions.find((id) => id === id_permiso);

    if (!hasPermission) return false;

    return true;
  }

  return { userHasPermission };
}
