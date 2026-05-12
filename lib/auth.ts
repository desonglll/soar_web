import api from "@/lib/axios";
import type { ApiResponse, LoginRequest, LoginData, RegisterRequest, User } from "@/types";

export async function login(data: LoginRequest): Promise<LoginData> {
  const res = await api.post<ApiResponse<LoginData>>("/auth/login", data);
  return res.data.data;
}

export async function register(data: RegisterRequest): Promise<User> {
  const res = await api.post<ApiResponse<User>>("/users", data);
  return res.data.data;
}

export async function getUser(id: string): Promise<User> {
  const res = await api.get<ApiResponse<User>>(`/users/${id}`);
  return res.data.data;
}
