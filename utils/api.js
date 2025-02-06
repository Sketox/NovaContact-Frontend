import axios from "axios";

const API_BASE_URL =
  "https://57b3-2800-bf0-a40c-125a-794f-d42a-bbbe-2060.ngrok-free.app";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
