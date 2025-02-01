"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent auto redirect
    });

    if (result.error) {
      alert("Login failed! Check credentials.");
    } else {
      alert("Login successful! Redirecting to home...");

      // ✅ Force a session refresh
      const event = new Event("visibilitychange");
      document.dispatchEvent(event);

      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-secondary hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
