import PostCard from "@/components/post-card";
import Sidebar from "@/components/sidebar";
import type { Post, Sub } from "@/types";

// TODO: replace with real API calls
const mockSubs: Sub[] = [
  {
    name: "programming",
    title: "Programming",
    description: "All things code",
    memberCount: 5200000,
  },
  {
    name: "technology",
    title: "Technology",
    description: "Tech news and discussion",
    memberCount: 14300000,
  },
  {
    name: "science",
    title: "Science",
    description: "Scientific discoveries",
    memberCount: 31000000,
  },
  {
    name: "gaming",
    title: "Gaming",
    description: "Video games",
    memberCount: 38000000,
  },
  {
    name: "worldnews",
    title: "World News",
    description: "Global news",
    memberCount: 33000000,
  },
];

const mockPosts: Post[] = [
  {
    id: "1",
    title: "What's the most useful programming language to learn in 2026?",
    content:
      "I'm looking to pick up a new language this year. What would you recommend and why?",
    author: "code_newbie",
    sub: "programming",
    upvotes: 842,
    downvotes: 23,
    commentCount: 316,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Breakthrough in quantum computing achieves 99.9% fidelity",
    content:
      "Researchers at MIT have demonstrated a new approach to quantum error correction that achieves 99.9% gate fidelity, bringing practical quantum computing closer to reality.",
    author: "quantum_fan",
    sub: "science",
    upvotes: 5600,
    downvotes: 112,
    commentCount: 892,
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    title: "The new Switch 2 is selling faster than any console in history",
    content:
      "Nintendo reports that the Switch 2 has sold over 10 million units in its first week, breaking all previous records.",
    author: "gamer_42",
    sub: "gaming",
    upvotes: 12300,
    downvotes: 890,
    commentCount: 2400,
    createdAt: "8 hours ago",
  },
  {
    id: "4",
    title: "EU passes landmark AI regulation framework",
    content:
      "The European Parliament has approved the final version of the AI Governance Act, setting global standards for AI development and deployment.",
    author: "policy_watcher",
    sub: "technology",
    upvotes: 4500,
    downvotes: 340,
    commentCount: 1500,
    createdAt: "12 hours ago",
  },
  {
    id: "5",
    title: "How I built a full-stack app in a weekend using AI agents",
    content:
      "I used AI coding agents to build and deploy a complete SaaS product in 48 hours. Here's what I learned about the current state of AI-assisted development.",
    author: "indie_hacker",
    sub: "programming",
    upvotes: 2100,
    downvotes: 180,
    commentCount: 620,
    createdAt: "1 day ago",
  },
];

export default function HomePage() {
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
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <Sidebar subs={mockSubs} />
      </div>
    </div>
  );
}
