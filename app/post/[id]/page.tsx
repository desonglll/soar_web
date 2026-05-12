"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getPost, deletePost } from "@/lib/posts";
import { useAuth } from "@/lib/auth-context";
import type { Post } from "@/types";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = params.id as string;
    if (!id) {
      setError("Invalid post ID");
      setLoading(false);
      return;
    }
    getPost(id)
      .then(setPost)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load post"))
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handleDelete() {
    if (!post || !confirm("Delete this post?")) return;
    try {
      await deletePost(post.id);
      router.push("/");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found</p>;

  const isAuthor = currentUser?.id === post.userId;

  return (
    <div>
      <Link href="/">Back</Link>
      <article>
        <h1>{post.title}</h1>
        <p>
          Posted by {post.user?.userName ?? "unknown"} &middot;{" "}
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <p>{post.content}</p>
        {isAuthenticated && isAuthor && (
          <div>
            <Link href={`/post/${post.id}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </article>
    </div>
  );
}
