import { clientFetch } from "@shared/api/clientFetch";

export const deleteUserBook = async (id: string) => {
  const res = await clientFetch(`/user-books/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete book");

  return res.json();
};
