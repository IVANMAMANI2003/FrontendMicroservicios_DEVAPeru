/* eslint-disable no-undef */
import axios from "axios";
import { API_URL_CAT, headers } from "../config/config";

export const getCategoryList = () => {
  return axios.get(API_URL_CAT, { headers });
};

export const createCategory = (categoria) => {
  return axios.post(API_URL_CAT, categoria, { headers });
};

export const updateCategory = (id, categoria) => {
  return axios.put(`${API_URL_CAT}/imagen/${id}`, categoria, { headers });
};

export const deleteCategory = (id) => {
  const url = `${API_URL_CAT}/${id}`;
  return axios.delete(url, { headers });
};

export const deleteSelectedCategories = (categoriaIds) => {
  const deleteRequests = categoriaIds.map((id) => deleteCategory(id));
  return Promise.all(deleteRequests);
};
