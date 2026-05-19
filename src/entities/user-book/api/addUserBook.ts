import { clientFetch } from "@shared/api/clientFetch";
import { AddUserBookDto } from "@entities/user-book/model/models";

export async function addUserBook(dto: AddUserBookDto) {
  const res = await clientFetch("/user-books", {
    method: "POST",
    body: JSON.stringify(dto),
  });

  return res.json();
}
