"use client";

import { useState } from "react";
import { login } from "../api/login";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login({ email, password });
      router.replace("/books");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
