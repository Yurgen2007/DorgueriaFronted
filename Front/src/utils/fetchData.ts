// se encarga de consultar datos desde el backend (API) usando la librería Axios.
import axios from "axios";

export const fetchEntidad = async (entidad: string) => {
  const res = await axios.get(`http://localhost:3000/${entidad}`);

  return res.data;
};
// Devuelve los datos (res.data) que el backend responde, usualmente un array de objetos.
