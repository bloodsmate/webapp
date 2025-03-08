import axios, { AxiosInstance } from "axios";
import { DEFAULT_BACKEND_URL } from "./constants";

// const BASE_URL = "http://localhost:3001/api"
// const BASE_URL: string = "https://backend-vbgu.onrender.com/api";
// const BASE_URL = process.env.API_BASE_URL;

export const publicAuthRequest: AxiosInstance = axios.create({
  baseURL: DEFAULT_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "origin-list",
  },
});
