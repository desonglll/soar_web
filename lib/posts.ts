import api from "@/lib/axios";
import type { ApiResponse, Post, GetPostsParams, PaginatedPosts } from "@/types";

export async function getPosts(params?: GetPostsParams): Promise<PaginatedPosts> {
  const url = params?.keyword ? "/posts/search" : "/posts";
  const res = await api.get<ApiResponse<PaginatedPosts>>(url, {
    params: {
      page: params?.page,
      pageSize: params?.pageSize,
      ...(params?.keyword ? { keyword: params.keyword } : {}),
    },
  });
  return res.data.data;
}

export async function getPost(id: string): Promise<Post> {
  const res = await api.get<ApiResponse<Post>>(`/posts/${id}`);
  return res.data.data;
}

export async function createPost(data: { title: string; content: string }): Promise<Post> {
  const res = await api.post<ApiResponse<Post>>("/posts", data);
  return res.data.data;
}

export async function updatePost(id: string, data: { title: string; content: string }): Promise<Post> {
  const res = await api.put<ApiResponse<Post>>(`/posts/${id}`, data);
  return res.data.data;
}

export async function deletePost(id: string): Promise<void> {
  await api.delete(`/posts/${id}`);
}
