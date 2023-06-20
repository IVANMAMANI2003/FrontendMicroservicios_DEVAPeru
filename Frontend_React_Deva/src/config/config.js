export const API_URL_CAT = "http://localhost:9090/categoria";

const token = localStorage.getItem("token");
export const headers = {
  Authorization: `Bearer ${token}`,
};
