"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import validator from "validator";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    // 🔹 1️⃣ Validate Email Format
    if (!validator.isEmail(email)) {
      setError("Invalid email format");
      return;
    }

    // 🔹 2️⃣ Validate Phone Number Format
    if (!validator.isMobilePhone(phone, "any")) {
      setError("Invalid phone number");
      return;
    }

    // 🔹 3️⃣ Validate Password Strength
    if (
      !validator.isStrongPassword(password, {
        minLength: 6,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 0,
        minSymbols: 0,
      })
    ) {
      setError("Password must be at least 6 characters with 1 number");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });

    if (res.ok) {
      alert("Signup successful! Redirecting to login page...");
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 lg:px-20 pt-20 pb-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Create Your Account
        </h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="firstname lastname"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              Phone Number
            </label>
            <input
              type="text"
              placeholder="+123 456 7890"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-secondary hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
