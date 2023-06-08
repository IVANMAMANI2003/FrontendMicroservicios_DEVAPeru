import axios from "axios";

const API_URL = "http://localhost:9090/post";

export const getPostList = () => {
  return axios.get(API_URL);
};

export const createPost = (image) => {
  return axios.post(API_URL, image);
};

export const updatePost = (id, image) => {
  return axios.put(`${API_URL}/imagen/${id}`, image);
};

export const deletePost = (id) => {
  const url = `${API_URL}/${id}`;
  return axios.delete(url);
};

export const deleteSelectedPosts = (ids) => {
  const deleteRequests = ids.map((id) => deletePost(id));
  return Promise.all(deleteRequests);
};
