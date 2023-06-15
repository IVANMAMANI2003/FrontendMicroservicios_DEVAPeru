import axios from "axios";

const API_URL = "http://localhost:9090/mensaje";
const token = localStorage.getItem("token");

export const getMensajeList = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createMensaje = (mensaje) => {
  return axios.post(API_URL, mensaje, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateMensaje = (mensaje) => {
  return axios.put(API_URL, mensaje, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMensaje = (id) => {
  const url = `${API_URL}/${id}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSelectedMensaje = (mensajeIds) => {
  const deleteRequests = mensajeIds.map((id) => deleteMensaje(id));
  return Promise.all(deleteRequests, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
