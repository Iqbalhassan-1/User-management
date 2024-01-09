import axios from "axios";
import { BASE_URL } from "../config/apiRoutes";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const jwtToken = localStorage.getItem("token");
  if (jwtToken) {
    config.headers["Authorization"] = `Bearer ${jwtToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    throw error.response.data;
  }
);

export default api;
