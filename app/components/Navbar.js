"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-primary text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link href="/" className="text-2xl font-bold text-accent">
          Safari Stay Wilpattu
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-accent transition duration-300">
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-accent transition duration-300"
          >
            About
          </Link>
          <Link
            href="/rooms"
            className="hover:text-accent transition duration-300"
          >
            Rooms
          </Link>
          <Link
            href="/contact"
            className="hover:text-accent transition duration-300"
          >
            Contact
          </Link>

          {/* ✅ Show Admin Panel if User is Admin */}
          {session?.user?.role === "admin" && (
            <Link
              href="/admin"
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Admin Panel
            </Link>
          )}

          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-secondary px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-secondary px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
