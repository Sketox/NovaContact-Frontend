import axios from "axios";

const API_BASE_URL =
  "https://758f-2800-68-42-2-4fa-247c-dfd1-9392.ngrok-free.app";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
