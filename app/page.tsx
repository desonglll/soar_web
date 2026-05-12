"use client";

import { useState, useEffect } from "react";
import PostCard from "@/components/post-card";
import Sidebar from "@/components/sidebar";
import { getPosts } from "@/lib/posts";
import type { Post, Sub } from "@/types";

const mockSubs: Sub[] = [
  { name: "programming", title: "Programming", description: "All things code", memberCount: 5200000 },
  { name: "technology", title: "Technology", description: "Tech news and discussion", memberCount: 14300000 },
  { name: "science", title: "Science", description: "Scientific discoveries", memberCount: 31000000 },
  { name: "gaming", title: "Gaming", description: "Video games", memberCount: 38000000 },
  { name: "worldnews", title: "World News", description: "Global news", memberCount: 33000000 },
];

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div>
        <div>
          <nav>
            <button>Hot</button>
            <button>New</button>
            <button>Top</button>
          </nav>
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <Sidebar subs={mockSubs} />
      </div>
    </div>
  );
}
