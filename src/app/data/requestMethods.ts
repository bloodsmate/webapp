import axios, { AxiosInstance } from "axios";

const BASE_URL: string = "http://localhost:3001/api/";

export const publicAuthRequest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "origin-list",
  },
});
