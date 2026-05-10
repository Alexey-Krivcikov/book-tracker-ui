import { clientFetch } from "@shared/api/clientFetch";

export async function getUserBooks() {
  const res = await clientFetch("/user-books", {
    method: "GET",
  });

  return res.json();
}
