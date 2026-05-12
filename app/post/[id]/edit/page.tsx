"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getPost, updatePost } from "@/lib/posts";
import { useAuth } from "@/lib/auth-context";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    const id = params.id as string;
    getPost(id)
      .then((post) => {
        if (currentUser?.id !== post.userId) {
          router.replace(`/post/${post.id}`);
          return;
        }
        setTitle(post.title);
        setContent(post.content);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load post"))
      .finally(() => setLoading(false));
  }, [params.id, isAuthenticated, currentUser, router]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const id = params.id as string;
      await updatePost(id, { title, content });
      router.push(`/post/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update post");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isAuthenticated) return null;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save"}
        </button>
      </form>
      <p>
        <Link href={`/post/${params.id}`}>Cancel</Link>
      </p>
    </div>
  );
}
