import axios from "axios";
import { API_URL, headers } from "../config/config";

export const getProductList = () => {
  return axios.get(API_URL.PRO, { headers });
};

export const createProduct = (product) => {
  return axios.post(API_URL.PRO, product, { headers });
};

export const updateProduct = (id, product) => {
  return axios.put(`${API_URL.PRO}/imagen/${id}`, product, { headers });
};

export const deleteProduct = (id) => {
  const url = `${API_URL.PRO}/${id}`;
  return axios.delete(url, { headers });
};

export const deleteSelectedProducts = (productIds) => {
  const deleteRequests = productIds.map((id) => deleteProduct(id));
  return Promise.all(deleteRequests);
};
