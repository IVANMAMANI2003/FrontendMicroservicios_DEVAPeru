import axios from "axios";
import { API_URL_POS, headers } from "../config/config";

export const getPostList = () => {
  return axios.get(API_URL_POS, { headers });
};

export const createPost = (image) => {
  return axios.post(API_URL_POS, image, { headers });
};

export const updatePost = (id, image) => {
  return axios.put(`${API_URL_POS}/imagen/${id}`, image, { headers });
};

export const deletePost = (id) => {
  const url = `${API_URL_POS}/${id}`;
  return axios.delete(url, { headers });
};

export const deleteSelectedPosts = (ids) => {
  const deleteRequests = ids.map((id) => deletePost(id));
  return Promise.all(deleteRequests);
};
