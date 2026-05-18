"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function OwnerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginOwner = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      window.location.href = "/owner-dashboard";
    } catch {
      alert("Invalid owner email or password");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ff7b00] via-[#ff8c1a] to-black flex items-center justify-center p-4">
      <div className="bg-black/80 text-white border border-orange-400/30 rounded-[35px] p-8 w-full max-w-md shadow-2xl">
        <p className="uppercase tracking-[0.3em] text-orange-400 text-sm font-black">
          Nikus Andhra Kitchen
        </p>

        <h1 className="text-4xl font-black mt-6">
          Owner Login
        </h1>

        <div className="space-y-5 mt-8">
          <input
            type="email"
            placeholder="Owner Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white text-black font-bold outline-none"
          />

          <input
            type="password"
            placeholder="Owner Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white text-black font-bold outline-none"
          />

          <button
            onClick={loginOwner}
            className="w-full bg-orange-500 text-black py-4 rounded-2xl font-black"
          >
            Sign In
          </button>
        </div>
      </div>
    </main>
  );
}