const API_URL = "http://localhost:9090";

export const API_URL_CAT = `${API_URL}/categoria`;
export const API_URL_PRO = `${API_URL}/producto`;
export const API_URL_AUTH = `${API_URL}/auth`;
export const API_URL_MEN = `${API_URL}/mensaje`;
export const API_URL_VEN = `${API_URL}/venta`;
export const API_URL_USE = `${API_URL}/usuario`;
export const API_URL_POS = `${API_URL}/post`;

const token = localStorage.getItem("token");
export const headers = {
  Authorization: `Bearer ${token}`
};
