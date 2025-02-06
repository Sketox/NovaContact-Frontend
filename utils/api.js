import axios from "axios";

const API_BASE_URL = "https://0ec6-190-15-130-164.ngrok-free.app";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
