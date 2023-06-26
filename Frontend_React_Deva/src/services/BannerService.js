import axios from "axios";
import { API_URL, headers } from "../config/config";

export const getBannerList = () => {
  return axios.get(API_URL.BAN, { headers });
};

export const createBanner = (banner) => {
  return axios.post(API_URL.BAN, banner, { headers });
};

export const updateBanner = (id, banner) => {
  return axios.put(`${API_URL.BAN}/imagen/${id}`, banner, { headers });
};

export const deleteBanner = (id) => {
  const url = `${API_URL.BAN}/${id}`;
  return axios.delete(url, { headers });
};

export const deleteSelectedBanners = (bannerIds) => {
  const deleteRequests = bannerIds.map((id) => deleteBanner(id));
  return Promise.all(deleteRequests);
};
