import { LoginForm } from "@features/auth/ui/LoginForm";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-md bg-white dark:bg-black p-8 rounded-xl">
        <LoginForm />
      </main>
    </div>
  );
};
