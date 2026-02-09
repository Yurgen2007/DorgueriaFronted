/**
 * Formatea una fecha para mostrarla en la zona horaria de Colombia (America/Bogota)
 * Esto evita el problema de que las fechas se muestren un día antes
 */
export const formatDateColombia = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return "";
  
  // Si ya viene en formato YYYY-MM-DD, devolverla directamente
  if (typeof dateString === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  
  // Usar timezone de America/Bogota para evitar desfase de un día
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "America/Bogota",
  });
};

/**
 * Formatea una fecha para input type="date" (YYYY-MM-DD)
 */
export const formatDateForInput = (date: Date | string | null | undefined): string => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split('T')[0];
};
