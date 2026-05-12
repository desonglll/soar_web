"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const { isAuthenticated, currentUser, logout } = useAuth();

  return (
    <header>
      <nav className="flex items-center justify-between">
        <Link href="/">SOAR</Link>
        <div>
          {isAuthenticated ? (
            <>
              <Link href="/create">Create Post</Link>
              <span>{currentUser?.userName}</span>
              <button onClick={logout}>Log Out</button>
            </>
          ) : (
            <>
              <Link href="/login">Log In</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
