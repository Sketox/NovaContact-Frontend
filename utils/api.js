import axios from "axios";

const API_BASE_URL = " https://d8c3-190-63-116-131.ngrok-free.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
