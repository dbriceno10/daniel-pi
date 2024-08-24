import axios from "axios";
console.log(process.env.REACT_APP_API)
const axiosIntance = axios.create({
  baseURL: process.env.REACT_APP_API ?? "http://localhost:3001",
  timeout: 30000,
});

export default axiosIntance;
