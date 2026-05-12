import api from "@/lib/axios";
import type { ApiResponse, LoginRequest, LoginData, RegisterRequest, User } from "@/types";

export async function login(data: LoginRequest): Promise<LoginData> {
  const res = await api.post<ApiResponse<LoginData>>("/login", data);
  return res.data.data;
}

export async function register(data: RegisterRequest): Promise<User> {
  const res = await api.post<ApiResponse<User>>("/register", data);
  return res.data.data;
}

export async function getMe(): Promise<User> {
  const res = await api.get<ApiResponse<User>>("/me");
  return res.data.data;
}

export async function logout(): Promise<void> {
  await api.post("/logout");
}
