"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { getComments, createComment } from "@/lib/comments";
import CommentItem from "@/components/comment-item";
import type { Comment } from "@/types";

export default function CommentSection({ postId }: { postId: string }) {
  const { isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newContent, setNewContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(() => {
    getComments(postId)
      .then(setComments)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load comments"))
      .finally(() => setLoading(false));
  }, [postId]);

  const refreshComments = useCallback(() => {
    getComments(postId)
      .then(setComments)
      .catch(() => {});
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!newContent.trim()) return;
    setSubmitting(true);
    try {
      await createComment(postId, { content: newContent });
      setNewContent("");
      refreshComments();
    } catch {
      alert("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2>Comments</h2>

      {isAuthenticated && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={3}
            placeholder="Add a comment..."
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Comment"}
          </button>
        </form>
      )}

      {loading && <p>Loading comments...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && comments.length === 0 && <p>No comments yet</p>}
      {!loading && !error && comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          onRefreshAction={refreshComments}
        />
      ))}
    </div>
  );
}
