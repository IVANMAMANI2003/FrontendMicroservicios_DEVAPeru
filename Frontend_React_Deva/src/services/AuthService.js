import axios from "axios";

const API_URL = "http://localhost:9090/auth";
const token = localStorage.getItem("token");

export const createUser = (user) => {
    return axios.post(API_URL, user, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createLogin = (login) => {
    return axios.post(API_URL, login, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
