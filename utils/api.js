import axios from "axios";

const API_BASE_URL =
  "https://c9d2-2800-bf0-a40c-125a-14bb-c15c-7ce7-72df.ngrok-free.app";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
