import axios from "axios";
import { API_URL_USE, headers } from "../config/config";

export const getUserList = () => {
  return axios.get(API_URL_USE, { headers });
};

export const createUser = (user) => {
  return axios.post(API_URL_USE, user, { headers });
};

export const updateUser = (user) => {
  return axios.put(API_URL_USE, user, { headers });
};

export const deleteUser = (id) => {
  const url = `${API_URL_USE}/${id}`;
  return axios.delete(url, { headers });
};

export const deleteSelectedUsers = (userIds) => {
  const deleteRequests = userIds.map((id) => deleteUser(id));
  return Promise.all(deleteRequests);
};
