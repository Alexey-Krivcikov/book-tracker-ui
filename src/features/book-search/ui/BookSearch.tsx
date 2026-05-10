"use client";

import { useState } from "react";
import { searchBooks } from "../api/searchBooks";
import type { Book } from "@entities/book/model/book";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import Image from "next/image";

export const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchBooks(query);
      setBooks(data);
    } catch (e) {
      console.error(e);
      setError("Ошибка загрузки книг");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-2">
        <Input
          placeholder="Введите название книги..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Поиск..." : "Найти"}
        </Button>
      </div>

      {error && <div className="text-sm text-destructive">{error}</div>}

      {!loading && books.length === 0 && (
        <div className="text-sm text-muted-foreground">Книги пока не найдены</div>
      )}
      <div className="grid gap-4">
        {books.map((book, index) => (
          <Card key={`${book.id}-${index}`} className="overflow-hidden">
            <div className="flex gap-4 p-4">
              {book.cover ? (
                <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-md border">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              ) : (
                <div className="h-36 w-24 rounded-md border bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  Нет обложки
                </div>
              )}

              <div className="flex flex-1 flex-col min-w-0">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg leading-tight">{book.title}</CardTitle>
                </CardHeader>

                <CardContent className="p-0 pt-3 flex flex-col gap-3">
                  {book.authors.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Автор: {book.authors.join(", ")}
                    </div>
                  )}

                  {book.description && (
                    <div className="text-sm text-muted-foreground line-clamp-4">
                      {book.description}
                    </div>
                  )}
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
