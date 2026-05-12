export interface User {
  id: string;
  userName: string;
  email: string;
  age: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  user?: User;
  parentId: string | null;
  replies: Comment[];
  createdAt: string;
  updatedAt: string;
}

// API response wrapper
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// Pagination
export interface GetPostsParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export interface PaginatedPosts {
  items: Post[];
  total: number;
  page: number;
  pageSize: number;
}

// Auth
export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginData {
  token: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  age: number;
  password: string;
}
