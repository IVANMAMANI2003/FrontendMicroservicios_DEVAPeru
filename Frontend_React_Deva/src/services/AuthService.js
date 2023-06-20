import axios from "axios";
import { API_URL_AUTH, headers } from "../config/config";

export const createUser = (user) => {
    return axios.post(API_URL_AUTH, user, { headers });
};

export const createLogin = (login) => {
    return axios.post(API_URL_AUTH, login, { headers });
};
