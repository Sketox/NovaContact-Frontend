import axios from "axios";

const API_BASE_URL =
  "https://3ae5-2800-bf0-a40c-125a-6421-c68e-2e3d-57f5.ngrok-free.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
