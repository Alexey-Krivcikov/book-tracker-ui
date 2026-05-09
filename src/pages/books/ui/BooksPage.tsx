import { auth } from "@shared/auth/auth";
import { redirect } from "next/navigation";

export default async function BooksPage() {
  const session = await auth();
  console.log("!session", !session);

  if (!session) {
    redirect("/login");
  }

  return <div>books</div>;
}
