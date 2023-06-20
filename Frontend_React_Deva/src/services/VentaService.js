import axios from "axios";
import { API_URL_VEN, headers } from "../config/config";

export const getVentaList = () => {
  return axios.get(API_URL_VEN, { headers });
};

export const createVenta = (venta) => {
  return axios.post(API_URL_VEN, venta, { headers });
};

export const updateVenta = (id, venta) => {
  return axios.put(`${API_URL_VEN}/imagen/${id}`, venta, { headers });
};

export const deleteVenta = (id) => {
  const url = `${API_URL_VEN}/${id}`;
  return axios.delete(url, { headers });
};

export const deleteSelectedVentas = (ventaIds) => {
  const deleteRequests = ventaIds.map((id) => deleteProduct(id));
  return Promise.all(deleteRequests);
};
