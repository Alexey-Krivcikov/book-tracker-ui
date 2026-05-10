"use client";

import Link from "next/link";
import { Button } from "@shared/ui/button";
import { signOut } from "next-auth/react";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <div className="flex gap-4">
          <Link href="/books">Поиск</Link>
          <Link href="/library">Библиотека</Link>
        </div>

        <Button variant="outline" onClick={() => signOut()}>
          Выйти
        </Button>
      </div>
    </header>
  );
};
