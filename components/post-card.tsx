import Link from "next/link";
import type { Post } from "@/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article>
      <div>
        <button>&#9650;</button>
        <span>{post.upvotes - post.downvotes}</span>
        <button>&#9660;</button>
      </div>
      <div>
        <div>
          <Link href={`/sub/${post.sub}`}>s/{post.sub}</Link>
          <span>Posted by u/{post.author}</span>
          <time>{post.createdAt}</time>
        </div>
        <h2>
          <Link href={`/post/${post.id}`}>{post.title}</Link>
        </h2>
        <p>{post.content}</p>
        <div>
          <Link href={`/post/${post.id}`}>{post.commentCount} Comments</Link>
          <button>Share</button>
          <button>Save</button>
        </div>
      </div>
    </article>
  );
}
