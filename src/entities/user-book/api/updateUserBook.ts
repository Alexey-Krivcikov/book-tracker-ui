import { clientFetch } from "@shared/api/clientFetch";
import { UserBookStatus } from "@entities/user-book/model/models";

type UpdateUserBookPayload = {
  status?: UserBookStatus;
  rating?: number;
};

export async function updateUserBook(id: string, payload: UpdateUserBookPayload) {
  const res = await clientFetch(`/user-books/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return res.json();
}
