"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { deletePost } from "@/lib/posts";
import type { Post } from "@/types";

export default function PostCard({ post, onPostDeletedAction }: { post: Post; onPostDeletedAction?: () => void }) {
  const { currentUser } = useAuth();
  const isAuthor = currentUser?.id === post.userId;

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;
    try {
      await deletePost(post.id);
      onPostDeletedAction?.();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  return (
    <article>
      <div>
        <h2>
          <Link href={`/post/${post.id}`}>{post.title}</Link>
        </h2>
        <p>{post.content}</p>
        <div>
          <span>Posted by {post.user?.userName ?? "unknown"} At </span>
          <time>{new Date(post.createdAt).toLocaleDateString()} </time>
          <Link href={`/post/${post.id}`}>Comments</Link>
          {isAuthor && (
            <>
              <Link href={`/post/${post.id}/edit`}>Edit</Link>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
