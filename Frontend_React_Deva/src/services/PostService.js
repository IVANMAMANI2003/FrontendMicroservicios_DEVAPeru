import axios from "axios";

const API_URL = "http://localhost:9090/post";
const token = localStorage.getItem("token");

export const getPostList = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createPost = (image) => {
  return axios.post(API_URL, image, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePost = (id, image) => {
  return axios.put(`${API_URL}/imagen/${id}`, image, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePost = (id) => {
  const url = `${API_URL}/${id}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSelectedPosts = (ids) => {
  const deleteRequests = ids.map((id) => deletePost(id));
  return Promise.all(deleteRequests, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
