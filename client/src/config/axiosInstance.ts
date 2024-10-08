import axios from "axios";

const axiosIntance = axios.create({
  baseURL: process.env.REACT_APP_API ?? "http://localhost:3001",
  timeout: 120000,
});

export default axiosIntance;
