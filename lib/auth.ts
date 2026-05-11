import api from "@/lib/axios";
import type {
  ApiResponse,
  LoginRequest,
  LoginData,
  RegisterRequest,
  UserData,
} from "@/types";

export async function login(data: LoginRequest): Promise<LoginData> {
  const res = await api.post<ApiResponse<LoginData>>("/login", data);
  console.log("login raw response:", res);
  console.log("login res.data:", res.data);
  console.log("login res.data.data:", res.data.data);
  return res.data.data;
}

export async function register(data: RegisterRequest): Promise<UserData> {
  const res = await api.post<ApiResponse<UserData>>("/register", data);
  return res.data.data;
}
