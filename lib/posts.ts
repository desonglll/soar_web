import api from "@/lib/axios";
import type { ApiResponse, Post } from "@/types";

export async function getPosts(): Promise<Post[]> {
  const res = await api.get<ApiResponse<Post[]>>("/posts");
  return res.data.data;
}

export async function getPost(id: number): Promise<Post> {
  const res = await api.get<ApiResponse<Post>>(`/posts/${id}`);
  return res.data.data;
}

export async function createPost(data: { title: string; content: string }): Promise<Post> {
  const res = await api.post<ApiResponse<Post>>("/posts", data);
  return res.data.data;
}
