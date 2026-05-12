import api from "@/lib/axios";
import type { ApiResponse, Comment } from "@/types";

export async function getComments(postId: string): Promise<Comment[]> {
  const res = await api.get<ApiResponse<Comment[]>>(`/posts/${postId}/comments`);
  console.log("comments response:", JSON.stringify(res.data.data, null, 2));
  return res.data.data;
}

export async function createComment(
  postId: string,
  data: { content: string; parentId?: string | null },
): Promise<Comment> {
  const res = await api.post<ApiResponse<Comment>>(`/posts/${postId}/comments`, data);
  return res.data.data;
}

export async function updateComment(
  postId: string,
  commentId: string,
  data: { content: string },
): Promise<Comment> {
  const res = await api.put<ApiResponse<Comment>>(`/posts/${postId}/comments/${commentId}`, data);
  return res.data.data;
}

export async function deleteComment(postId: string, commentId: string): Promise<void> {
  await api.delete(`/posts/${postId}/comments/${commentId}`);
}
