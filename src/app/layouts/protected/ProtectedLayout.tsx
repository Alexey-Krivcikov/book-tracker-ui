import { auth } from "@shared/auth/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@widgets/navbar/ui/Navbar";
import React from "react";

export async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex justify-center px-4 pt-16 bg-muted/30">{children}</main>
    </div>
  );
}
