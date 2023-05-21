import axios from "axios";

const API_URL = "http://localhost:9090/mensaje";

export const getMensajeList = () => {
  return axios.get(API_URL);
};

export const createMensaje = (mensaje) => {
  return axios.post(API_URL, mensaje);
};

export const updateMensaje = (mensaje) => {
  return axios.put(API_URL, mensaje);
};

export const deleteMensaje = (id) => {
  const url = `${API_URL}/${id}`;
  return axios.delete(url);
};

export const deleteSelectedCategories = (mensajeIds) => {
  const deleteRequests = mensajeIds.map((id) =>
    deleteMensaje(id)
  );
  return Promise.all(deleteRequests);
};
