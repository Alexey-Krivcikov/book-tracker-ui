import { clientFetch } from "@shared/api/clientFetch";
import type { UserBook } from "@entities/user-book/model/models";

export async function getUserBooks(): Promise<UserBook[]> {
  const res = await clientFetch("/user-books", {
    method: "GET",
  });

  return res.json();
}
