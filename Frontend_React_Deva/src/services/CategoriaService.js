import axios from "axios";

const API_URL = "http://localhost:9090/categoria";

export const getCategoryList = () => {
  return axios.get(API_URL);
};

export const createCategory = (categoria) => {
  return axios.post(API_URL, categoria);
};

export const updateCategory = (categoria) => {
  return axios.put(API_URL, categoria);
};

export const deleteCategory = (id) => {
  const url = `${API_URL}/${id}`;
  return axios.delete(url);
};

export const deleteSelectedCategories = (categoriaIds) => {
  const deleteRequests = categoriaIds.map((id) =>
    deleteCategory(id)
  );
  return Promise.all(deleteRequests);
};
