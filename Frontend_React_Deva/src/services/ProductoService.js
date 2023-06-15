import axios from "axios";

const API_URL = "http://localhost:9090/producto";
const token = localStorage.getItem("token");

export const getProductList = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProduct = (product) => {
  return axios.post(API_URL, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = (id, product) => {
  return axios.put(`${API_URL}/imagen/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = (id) => {
  const url = `${API_URL}/${id}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSelectedProducts = (productIds) => {
  const deleteRequests = productIds.map((id) => deleteProduct(id));
  return Promise.all(deleteRequests, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
