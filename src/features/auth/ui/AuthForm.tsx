"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { registerUser } from "@entities/user/api/registerUser";

type Mode = "login" | "register";

const authSchema = z.object({
  email: z.email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов").max(100, "Слишком длинный пароль"),
});

type AuthFormValues = z.infer<typeof authSchema>;

export const AuthForm = () => {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const isLogin = mode === "login";

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: AuthFormValues) => {
    setLoading(true);
    setServerError(null);

    try {
      const { email, password } = values;

      if (isLogin) {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setServerError("Неверный email или пароль");
          return;
        }

        router.replace("/books");
        return;
      }

      const result = await registerUser({
        email,
        password,
      });

      if (!result) {
        setServerError("Ошибка регистрации");
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
    } catch {
      setServerError("Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[340px]">
      <div className="text-lg font-semibold">{isLogin ? "Вход" : "Регистрация"}</div>

      <div className="flex flex-col gap-1">
        <Input placeholder="Почта" {...register("email")} />

        {errors.email && <div className="text-sm text-red-500">{errors.email.message}</div>}
      </div>

      <div className="flex flex-col gap-1">
        <Input type="password" placeholder="Пароль" {...register("password")} />

        {errors.password && <div className="text-sm text-red-500">{errors.password.message}</div>}
      </div>

      {serverError && <div className="text-sm text-red-500">{serverError}</div>}

      <Button type="submit" disabled={loading}>
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
        onClick={() => {
          setMode(isLogin ? "register" : "login");
          setServerError(null);
          clearErrors();
        }}
        className="text-sm text-muted-foreground hover:text-foreground transition"
      >
        {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
      </button>
    </form>
  );
};
