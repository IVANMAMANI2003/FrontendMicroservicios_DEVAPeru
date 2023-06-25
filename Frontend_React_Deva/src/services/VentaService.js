import axios from "axios";
import { API_URL, headers } from "../config/config";

export const getVentaList = () => {
  return axios.get(API_URL.VEN, { headers });
};

export const createVenta = (venta) => {
  return axios.post(API_URL.VEN, venta, { headers });
};

export const updateVenta = (id, venta) => {
  return axios.put(`${API_URL.VEN}/imagen/${id}`, venta, { headers });
};

export const deleteVenta = (id) => {
  const url = `${API_URL.VEN}/${id}`;
  return axios.delete(url, { headers });
};

export const deleteSelectedVentas = (ventaIds) => {
  const deleteRequests = ventaIds.map((id) => deleteVenta(id));
  return Promise.all(deleteRequests);
};
