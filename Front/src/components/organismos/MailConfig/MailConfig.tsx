import { useState, useEffect } from "react";
import { Button, Input, Card, CardBody, CardHeader, Divider, addToast } from "@heroui/react";
import { getMailConfig, putMailConfig, MailConfigData } from "@/axios/Auth/mailConfig";

export const MailConfig = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<MailConfigData>({
    serviceMail: "",
    mailUser: "",
    mailPassword: "",
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const response = await getMailConfig();
      if (response.data) {
        setConfig({
          serviceMail: response.data.serviceMail || "",
          mailUser: response.data.mailUser || "",
          mailPassword: "",
        });
      }
    } catch (error) {
      console.error("Error al cargar configuracion:", error);
      addToast({
        title: "Error",
        description: "No se pudo cargar la configuracion de correo",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await putMailConfig(config);
      addToast({
        title: "Exito",
        description: "Configuracion de correo guardada correctamente",
        color: "success",
      });
    } catch (error) {
      console.error("Error al guardar:", error);
      addToast({
        title: "Error",
        description: "No se pudo guardar la configuracion de correo",
        color: "danger",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Cargando configuracion...</p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-col gap-1 p-4">
        <h2 className="text-xl font-bold">Configuracion de Correo</h2>
        <p className="text-sm text-gray-500">
          Configure las credenciales para el envio de notificaciones por correo electronico
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="p-4 space-y-4">
        <Input
          label="Servicio de correo"
          placeholder="Ej: gmail, hotmail, outlook"
          value={config.serviceMail}
          onChange={(e) => setConfig({ ...config, serviceMail: e.target.value })}
          description="Servicio SMTP utilizado para enviar correos"
        />

        <Input
          label="Correo electronico"
          type="email"
          placeholder="correo@ejemplo.com"
          value={config.mailUser}
          onChange={(e) => setConfig({ ...config, mailUser: e.target.value })}
          description="Correo electronico que se utilizara para enviar notificaciones"
        />

        <Input
          label="Contrasena / Clave de aplicacion"
          type="password"
          placeholder="Ingrese la contrasena o clave de aplicacion"
          value={config.mailPassword}
          onChange={(e) => setConfig({ ...config, mailPassword: e.target.value })}
          description="Contrasena del correo o clave de aplicacion (si usa Gmail)"
        />

        <div className="flex justify-end pt-4">
          <Button
            color="primary"
            onPress={handleSave}
            isLoading={saving}
            isDisabled={!config.serviceMail || !config.mailUser}
          >
            Guardar Configuracion
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
