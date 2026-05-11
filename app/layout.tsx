import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOAR - Community Platform",
  description: "A community-driven platform for sharing and discussion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
