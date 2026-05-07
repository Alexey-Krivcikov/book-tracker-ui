import { redirect } from "next/navigation";

export function HomePage() {
  redirect("/books");
}
