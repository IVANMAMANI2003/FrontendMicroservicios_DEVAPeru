import axios from "axios";
import { API_URL, headers } from "../config/config";

export const getUserList = () => {
  return axios.get(API_URL.AUTH, { headers });
};

export const getUserListId = (id) => {
  return axios.get(`${API_URL.AUTH}/${id}`, { headers });
};

export const createUser = (user) => {
  return axios.post(API_URL.AUTH, user, { headers });
};

export const createLogin = (login) => {
  return axios.post(API_URL.AUTH, login, { headers });
};
