import { BookSearch } from "@features/book-search/ui/BookSearch";

export default async function BooksPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Поиск книг</h1>

          <p className="text-muted-foreground">
            Найдите книги по названию и сохраните интересные варианты.
          </p>
        </div>

        <BookSearch />
      </div>
    </div>
  );
}
