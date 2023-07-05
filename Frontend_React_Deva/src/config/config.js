export const API_URL = {
  CAT: `${import.meta.env.VITE_API_URL}/categoria`,
  PRO: `${import.meta.env.VITE_API_URL}/producto`,
  BAN: `${import.meta.env.VITE_API_URL}/banner`,
  AUTH: `${import.meta.env.VITE_API_URL}/auth`,
  MEN: `${import.meta.env.VITE_API_URL}/mensaje`,
  VEN: `${import.meta.env.VITE_API_URL}/venta`,
  USE: `${import.meta.env.VITE_API_URL}/usuario`,
};

const token = localStorage.getItem("token");
export const headers = {
  Authorization: `Bearer ${token}`,
};
