import axios, { AxiosInstance } from "axios";

// const BASE_URL: string = "http://localhost:3001/api/";
const BASE_URL = process.env.API_BASE_URL;

export const publicAuthRequest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "origin-list",
  },
});
