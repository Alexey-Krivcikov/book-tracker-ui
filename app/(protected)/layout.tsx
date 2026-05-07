import { redirect } from "next/navigation";
import { verifySession } from "@shared/auth/verifySession";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await verifySession();

  if (!user) {
    redirect("/login");
  }

  return children;
}
