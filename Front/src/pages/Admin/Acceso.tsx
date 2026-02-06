import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import Globaltable from "@/components/organismos/table.tsx";
import { TableColumn } from "@/components/organismos/table.tsx";
import { useModulo } from "@/hooks/Modulos/useModulo";
import { useRuta } from "@/hooks/Rutas/useRuta";
import { usePermisos } from "@/hooks/permisos/usePermisos";
import { Modulo } from "@/types/Modulo";
import { Ruta } from "@/types/Ruta";
import { Permisos } from "@/types/permisos";

export const AccesoPage = () => {
    const { modulos, changeState: stateMod } = useModulo();
    const { rutas, changeState: stateRut } = useRuta();
    const { permiso } = usePermisos();

    const moduloColumns: TableColumn<Modulo>[] = [
        { key: "nombre", label: "Nombre" },
        { key: "descripcion", label: "Descripción" },
        { key: "estado", label: "Estado" },
    ];

    const rutaColumns: TableColumn<Ruta>[] = [
        { key: "nombre", label: "Nombre" },
        { key: "urlDestino", label: "URL Destino" },
        { key: "estado", label: "Estado" },
    ];

    const permisoColumns: TableColumn<Permisos>[] = [
        { key: "permiso", label: "Permiso" },
    ];

    return (
        <div className="p-4 flex flex-col w-full">
            <Card className="mb-4">
                <CardBody>
                    <h1 className="text-2xl font-bold">Administración de Acceso (RBAC)</h1>
                </CardBody>
            </Card>

            <Tabs aria-label="Opciones de Acceso">
                <Tab key="modulos" title="Módulos">
                    <div className="mt-4">
                        <Globaltable
                            data={modulos?.map(m => ({ ...m, key: m.idModulo.toString(), estado: Boolean(m.estado) })) || []}
                            columns={moduloColumns}
                            onEdit={(m) => console.log("Edit mod", m)}
                            onDelete={(m) => stateMod(m.idModulo)}
                        />
                    </div>
                </Tab>
                <Tab key="rutas" title="Rutas">
                    <div className="mt-4">
                        <Globaltable
                            data={rutas?.map(r => ({ ...r, key: r.idRuta.toString(), estado: Boolean(r.estado) })) || []}
                            columns={rutaColumns}
                            onEdit={(r) => console.log("Edit ruta", r)}
                            onDelete={(r) => stateRut(r.idRuta)}
                        />
                    </div>
                </Tab>
                <Tab key="permisos" title="Permisos">
                    <div className="mt-4">
                        <Globaltable
                            data={permiso?.map(p => ({ ...p, key: (p.idPermiso || 0).toString() })) || []}
                            columns={permisoColumns}
                            onEdit={(p) => console.log("Edit per", p)}
                        />
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
};
