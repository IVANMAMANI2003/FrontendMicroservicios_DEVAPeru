import axios from "axios";
import { API_URL, headers } from "../config/config";

export const getMensajeList = () => {
  return axios.get(API_URL.MEN, { headers });
};

export const createMensaje = (mensaje) => {
  return axios.post(API_URL.MEN, mensaje, { headers });
};

export const updateMensaje = (mensaje) => {
  return axios.put(API_URL.MEN, mensaje, { headers });
};

export const deleteMensaje = (id) => {
  const url = `${API_URL.MEN}/${id}`;
  return axios.delete(url, { headers });
};

export const deleteSelectedMensaje = (mensajeIds) => {
  const deleteRequests = mensajeIds.map((id) => deleteMensaje(id));
  return Promise.all(deleteRequests);
};
