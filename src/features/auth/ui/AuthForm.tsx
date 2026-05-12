"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { registerUser } from "@entities/user/api/registerUser";

type Mode = "login" | "register";

export const AuthForm = () => {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLogin = mode === "login";

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Неверный email или пароль");
          return;
        }

        router.replace("/books");
        return;
      }

      // REGISTER
      const result = await registerUser({ email, password });

      if (!result) {
        setError("Ошибка регистрации");
        return;
      }

      const login = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!login?.error) {
        router.replace("/books");
      }
    } catch (e) {
      setError("Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-[340px]">
      <div className="text-lg font-semibold">{isLogin ? "Вход" : "Регистрация"}</div>

      <Input placeholder="Почта" value={email} onChange={(e) => setEmail(e.target.value)} />

      <Input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <div className="text-sm text-red-500">{error}</div>}

      <Button onClick={handleSubmit} disabled={loading}>
        {loading
          ? isLogin
            ? "Входим..."
            : "Создаём аккаунт..."
          : isLogin
            ? "Войти"
            : "Зарегистрироваться"}
      </Button>

      <button
        type="button"
        onClick={() => setMode(isLogin ? "register" : "login")}
        className="text-sm text-muted-foreground hover:text-foreground transition"
      >
        {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
      </button>
    </div>
  );
};
