import { clientFetch } from "@shared/api/clientFetch";

export enum UserBookStatus {
  PLANNED = "planned",
  READING = "reading",
  COMPLETED = "completed",
  DROPPED = "dropped",
}

export type AddUserBookDto = {
  title: string;
  authors: string[];
  description?: string;
  cover?: string;
  status: UserBookStatus;
  rating?: number;
};

export async function addUserBook(dto: AddUserBookDto) {
  const res = await clientFetch("/user-books", {
    method: "POST",
    body: JSON.stringify(dto),
  });

  return res.json();
}

export async function getUserBooks() {
  const res = await clientFetch("/user-books", {
    method: "GET",
  });

  return res.json();
}
