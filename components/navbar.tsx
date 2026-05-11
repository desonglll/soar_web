import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/">SOAR</Link>
        <div>
          <input type="text" placeholder="Search..." />
        </div>
        <div>
          <Link href="/login">Log In</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      </nav>
    </header>
  );
}
