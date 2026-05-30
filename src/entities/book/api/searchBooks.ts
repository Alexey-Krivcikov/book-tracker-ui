import { clientFetch } from "@shared/api/clientFetch";
import { Book } from "@entities/book/model/book";

export async function searchBooks(query: string): Promise<Book[]> {
  const res = await clientFetch(`/books/search?q=${query}`);
  return res.json();
}
