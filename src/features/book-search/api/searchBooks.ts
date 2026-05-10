import { clientFetch } from "@shared/api/clientFetch";

export async function searchBooks(query: string) {
  const res = await clientFetch(`/books/search?q=${encodeURIComponent(query)}`);

  return res.json();
}
