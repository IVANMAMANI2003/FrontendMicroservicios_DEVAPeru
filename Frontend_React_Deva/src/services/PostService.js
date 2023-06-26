import axios from "axios";
import { API_URL, headers } from "../config/config";

export const getPostList = () => {
  return axios.get(API_URL.POS, { headers });
};

export const createPost = (image) => {
  return axios.post(API_URL.POS, image, { headers });
};

export const updatePost = (id, image) => {
  return axios.put(`${API_URL.POS}/imagen/${id}`, image, { headers });
};

export const deletePost = (id) => {
  const url = `${API_URL.POS}/${id}`;
  return axios.delete(url, { headers });
};

export const deleteSelectedPosts = (ids) => {
  const deleteRequests = ids.map((id) => deletePost(id));
  return Promise.all(deleteRequests);
};
