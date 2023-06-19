import axios from "axios";

const API_URL = "http://localhost:9090/venta";
const token = localStorage.getItem("token");

export const getVentaList = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createVenta = (venta) => {
  return axios.post(API_URL, venta, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateVenta = (id, venta) => {
  return axios.put(`${API_URL}/imagen/${id}`, venta, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteVenta = (id) => {
  const url = `${API_URL}/${id}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSelectedVentas = (ventaIds) => {
  const deleteRequests = ventaIds.map((id) => deleteProduct(id));
  return Promise.all(deleteRequests, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
