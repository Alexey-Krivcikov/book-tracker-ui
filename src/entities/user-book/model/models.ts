export enum UserBookStatus {
  PLANNED = "planned",
  READING = "reading",
  COMPLETED = "completed",
  DROPPED = "dropped",
}

export type AddUserBookDto = {
  externalId: string;
  title: string;
  authors: string[];
  description?: string;
  cover?: string;
  status: UserBookStatus;
  rating?: number;
};

export type UserBook = {
  id: string;
  title: string;
  authors: string[];
  cover?: string;
  status: UserBookStatus;
  rating?: number;
  description?: string;
};
