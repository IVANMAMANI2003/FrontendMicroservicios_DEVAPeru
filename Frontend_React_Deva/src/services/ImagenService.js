import axios from "axios";

const API_URL = "http://localhost:9090/imagen";
const token = localStorage.getItem("token");

export const getImageList = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createImage = (image) => {
  return axios.post(API_URL, image, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateImage = (id, image) => {
  return axios.put(`${API_URL}/imagen/${id}`, image, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteImage = (id) => {
  const url = `${API_URL}/${id}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSelectedImages = (ids) => {
  const deleteRequests = ids.map((id) => deleteImage(id));
  return Promise.all(deleteRequests, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
