import Link from "next/link";
import type { Post } from "@/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article>
      <div>
        <h2>
          <Link href={`/post/${post.id}`}>{post.title}</Link>
        </h2>
        <p>{post.content}</p>
        <div>
          <span>Posted by u/{post.userId}</span>
          <time>{new Date(post.createdAt).toLocaleDateString()}</time>
          <Link href={`/post/${post.id}`}>Comments</Link>
        </div>
      </div>
    </article>
  );
}
