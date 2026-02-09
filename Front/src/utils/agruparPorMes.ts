export const agruparPorMes = (data: any[], nombreEntidad: string) => {
  const conteoPorMes: { [mes: string]: number } = {};

  data.forEach((item) => {
    const fecha = new Date(item.created_at);
    const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;

    conteoPorMes[mes] = (conteoPorMes[mes] || 0) + 1;
  });

  return Object.entries(conteoPorMes).map(([mes, total]) => ({
    nombre: nombreEntidad,
    mes,
    total,
  }));
};
