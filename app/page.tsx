"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import PostCard from "@/components/post-card";
import Pagination from "@/components/pagination";
import { getPosts } from "@/lib/posts";
import { useAuth } from "@/lib/auth-context";
import type { Post } from "@/types";

const SCROLL_KEY = "soar-post-list-scroll";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState(keyword);

  // Sync input when keyword changes externally (e.g., browser back)
  useEffect(() => {
    setInputValue(keyword);
  }, [keyword]);

  function updateParams(updates: Record<string, string | number>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function handleSearch() {
    updateParams({ keyword: inputValue, page: 1 });
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
  }

  function handlePageChange(newPage: number) {
    updateParams({ page: newPage });
  }

  function handlePageSizeChange(newPageSize: number) {
    updateParams({ pageSize: newPageSize, page: 1 });
  }

  const fetchPosts = useCallback(() => {
    setLoading(true);
    setError("");
    getPosts({
      page,
      pageSize,
      keyword: keyword || undefined,
    })
      .then((data) => {
        setPosts(data.items);
        setTotal(data.total);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load posts"))
      .finally(() => setLoading(false));
  }, [page, pageSize, keyword]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Scroll position preservation
  useEffect(() => {
    return () => {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      const savedY = sessionStorage.getItem(SCROLL_KEY);
      if (savedY) {
        window.scrollTo(0, parseInt(savedY, 10));
        sessionStorage.removeItem(SCROLL_KEY);
      }
    }
  }, [loading]);

  return (
    <div>
      <div>
        <div>
          <nav className="flex items-center justify-between py-2">
            {isAuthenticated && (
              <Link href="/create">Create Post</Link>
            )}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search posts..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="rounded border px-3 py-1 text-sm"
              />
              <button
                onClick={handleSearch}
                className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
              >
                Search
              </button>
              {keyword && (
                <button
                  onClick={() => {
                    setInputValue("");
                    updateParams({ keyword: "", page: 1 });
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
            </div>
          </nav>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && (
            <>
              {posts.length === 0 ? (
                <p>No posts found.</p>
              ) : (
                posts.map((post) => (
                  <PostCard key={post.id} post={post} onPostDeletedAction={fetchPosts} />
                ))
              )}
              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
