import axios from "axios";

const api = axios.create({
  baseURL: "/api", // or full URL later
  timeout: 10000,
});

export default api;
