/* eslint-disable no-undef */
import axios from "axios";
import { API_URL, headers } from "../config/config";

export const getCategoryList = () => {
  return axios.get(API_URL.CAT, { headers });
};

export const createCategory = (categoria) => {
  return axios.post(API_URL.CAT, categoria, { headers });
};

export const updateCategory = (id, categoria) => {
  return axios.put(`${API_URL.CAT}/imagen/${id}`, categoria, { headers });
};

export const deleteCategory = (id) => {
  const url = `${API_URL.CAT}/${id}`;
  return axios.delete(url, { headers });
};

export const deleteSelectedCategories = (categoriaIds) => {
  const deleteRequests = categoriaIds.map((id) => deleteCategory(id));
  return Promise.all(deleteRequests);
};
