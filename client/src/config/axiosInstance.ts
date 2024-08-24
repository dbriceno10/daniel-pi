import axios from "axios";

const axiosIntance = axios.create({
  baseURL: process.env.BASE_API_URL ?? "http://localhost:3001",
  timeout: 30000,
});

export default axiosIntance;
