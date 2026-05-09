"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";

export const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!result?.error) {
      router.replace("/books");
    }
  };

  return (
    <div className="flex flex-col gap-3 w-[320px]">
      <Input placeholder="Почта" value={email} onChange={(e) => setEmail(e.target.value)} />

      <Input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Входим..." : "Войти"}
      </Button>
    </div>
  );
};
