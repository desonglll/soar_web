export interface User {
  id: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

// API response wrapper
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// Auth
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
