"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { createComment, deleteComment, updateComment } from "@/lib/comments";
import type { Comment } from "@/types";

export default function CommentItem({
  comment,
  postId,
  onRefreshAction,
  depth = 0,
}: {
  comment: Comment;
  postId: string;
  onRefreshAction: () => void;
  depth?: number;
}) {
  const { currentUser, isAuthenticated } = useAuth();
  const isAuthor = currentUser?.id === comment.userId;

  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState(comment.content);
  const [submitting, setSubmitting] = useState(false);

  async function handleReply() {
    if (!replyContent.trim()) return;
    setSubmitting(true);
    try {
      await createComment(postId, { content: replyContent, parentId: comment.id });
      setReplyContent("");
      setReplying(false);
      onRefreshAction();
    } catch {
      alert("Failed to post reply");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEdit() {
    if (!editContent.trim()) return;
    setSubmitting(true);
    try {
      await updateComment(postId, comment.id, { content: editContent });
      setEditing(false);
      onRefreshAction();
    } catch {
      alert("Failed to update comment");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this comment?")) return;
    try {
      await deleteComment(postId, comment.id);
      onRefreshAction();
    } catch {
      alert("Failed to delete comment");
    }
  }

  return (
    <div style={{ marginLeft: depth * 24 }}>
      <div>
        <strong>{comment.user?.userName ?? "unknown"}</strong>
        <span>{new Date(comment.createdAt).toLocaleString()}</span>
      </div>

      {editing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={3}
          />
          <button onClick={handleEdit} disabled={submitting}>
            {submitting ? "Saving..." : "Save"}
          </button>
          <button onClick={() => { setEditing(false); setEditContent(comment.content); }}>
            Cancel
          </button>
        </div>
      ) : (
        <p>{comment.content}</p>
      )}

      <div>
        {isAuthenticated && !editing && (
          <button onClick={() => setReplying(!replying)}>
            {replying ? "Cancel" : "Reply"}
          </button>
        )}
        {isAuthor && !editing && (
          <>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>

      {replying && (
        <div>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={3}
            placeholder="Write a reply..."
          />
          <button onClick={handleReply} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      )}

      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          postId={postId}
          onRefreshAction={onRefreshAction}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}
