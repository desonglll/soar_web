import axios from "axios";
import type { ApiResponse } from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const body = response.data as ApiResponse<unknown>;
    if (response.status !== 200) {
      return Promise.reject(new Error(body.message || "Request failed"));
    }
    return response;
  },
  (error) => {
    const body = error.response?.data as ApiResponse<unknown> | undefined;
    if (body && error.response?.status === 200) {
      error.response.data = body;
      return Promise.resolve(error.response);
    }
    const message = body?.message || error.message || "Network error";
    return Promise.reject(new Error(message));
  },
);

export default api;
