import { BookSearch } from "@features/book-search/ui/BookSearch";
import { Metadata } from "next";

export const booksMetadata: Metadata = {
  title: "Книги",
  description: "Список всех книг",
};

export default async function BooksPage() {
  return (
    <div className="min-h-[auto] min-w-full flex flex-col items-center">
      <div className="container max-w-screen-lg flex flex-col gap-8 px-4 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Поиск книг</h1>

          <p className="text-muted-foreground">
            Найдите книги по названию и сохраните их в свою библиотеку.
          </p>
        </div>

        <BookSearch />
      </div>
    </div>
  );
}
