import { Button, Checkbox, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

import { getRolePermisos } from "@/axios/RolPermiso/getRolePermisos";
import { patchRolePermiso } from "@/axios/RolPermiso/patchRolePermiso";

export default function FormularioRolPermiso({ rol }: { rol: number }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [permisosAgrupados, setPermisosAgrupados] = useState<any[]>([]);
  const [assignedPermisos, setAssignedPermisos] = useState<number[]>([]);
  const [openModulos, setOpenModulos] = useState<number[]>([]);
  const [openRutas, setOpenRutas] = useState<number[]>([]);

  useEffect(() => {
    async function getPermisos() {
      const data: any = await getRolePermisos(rol);

      setPermisosAgrupados(data.permisosAgrupados);
      setAssignedPermisos(data.permisosAsignados);
      setLoading(false);
    }
    getPermisos();
  }, [rol]);

  async function handleChange(idPermiso: number) {
    await patchRolePermiso(idPermiso, rol);
  }

  const toggleModulo = (id: number) =>
    setOpenModulos((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );

  const toggleRuta = (id: number) =>
    setOpenRutas((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );

  if (loading) return <Spinner className="my-12" />;

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto p-4">
      {permisosAgrupados.map((modulo) => (
        <div key={modulo.idModulo} className="border rounded p-2">
          <Button
            className="w-auto text-left font-bold px-2 py-1"
            variant="ghost"
            onClick={() => toggleModulo(modulo.idModulo)}
          >
            {modulo.nombreModulo}
          </Button>

          {openModulos.includes(modulo.idModulo) && (
            <div className="pl-4 space-y-3">
              {modulo.rutas.map((ruta: any) => (
                <div
                  key={ruta.idRuta}
                  className="border-l-2 border-gray-300 pl-4"
                >
                  <Button
                    className="w-auto text-left text-sm px-2 py-1"
                    variant="ghost"
                    onClick={() => toggleRuta(ruta.idRuta)}
                  >
                    {ruta.nombreRuta}
                  </Button>

                  {openRutas.includes(ruta.idRuta) && (
                    <div className="pl-4 space-y-2">
                      {ruta.permisos.map((permiso: any) => (
                        <div
                          key={permiso.idPermiso}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            defaultSelected={assignedPermisos.includes(
                              permiso.idPermiso,
                            )}
                            onChange={() => handleChange(permiso.idPermiso)}
                          />
                          {permiso.permiso}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
