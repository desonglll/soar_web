export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Sub {
  name: string;
  title: string;
  description: string;
  memberCount: number;
}

// API response wrapper
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// Auth
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginData {
  token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  age: number;
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}
