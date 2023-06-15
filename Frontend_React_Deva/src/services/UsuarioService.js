import axios from "axios";

const API_URL = "http://localhost:9090/usuario";
const token = localStorage.getItem("token");

export const getUserList = () => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (user) => {
  return axios.post(API_URL, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = (user) => {
  return axios.put(API_URL, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = (id) => {
  const url = `${API_URL}/${id}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSelectedUsers = (userIds) => {
  const deleteRequests = userIds.map((id) => deleteUser(id));
  return Promise.all(deleteRequests, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
