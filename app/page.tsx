"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import PostCard from "@/components/post-card";
import { getPosts } from "@/lib/posts";
import { useAuth } from "@/lib/auth-context";
import type { Post } from "@/types";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = useCallback(() => {
    setLoading(true);
    setError("");
    getPosts()
      .then(setPosts)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div>
      <div>
        <div>
          <nav>
            <button>Hot</button>
            <button>New</button>
            <button>Top</button>
            {isAuthenticated && (
              <Link href="/create">Create Post</Link>
            )}
          </nav>
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && posts.map((post) => (
              <PostCard key={post.id} post={post} onPostDeletedAction={fetchPosts} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
