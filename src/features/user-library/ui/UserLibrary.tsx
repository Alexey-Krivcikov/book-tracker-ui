"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { getUserBooks } from "../api/getUserBooks";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

type UserBook = {
  id: string;
  title: string;
  authors: string[];
  cover?: string;
  status: string;
  rating?: number;
  description?: string;
};

export const UserLibrary = () => {
  const [books, setBooks] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserBooks();
        setBooks(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div className="text-sm text-muted-foreground">Загрузка библиотеки...</div>;
  }

  if (!books.length) {
    return <div className="text-sm text-muted-foreground">Библиотека пока пустая</div>;
  }

  return (
    <div className="grid gap-4 w-full max-w-4xl">
      {books.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="flex gap-5 p-4">
            {/* COVER */}
            {item.cover ? (
              <div className="relative w-24 h-32 shrink-0">
                <Image
                  src={item.cover}
                  alt={item.title}
                  fill
                  className="object-cover rounded-md border"
                />
              </div>
            ) : (
              <div className="w-24 h-32 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                Нет обложки
              </div>
            )}

            {/* CONTENT */}
            <div className="flex flex-col gap-2 flex-1">
              <CardHeader className="p-0 space-y-1">
                <CardTitle className="text-base leading-snug">{item.title}</CardTitle>

                <div className="text-sm text-muted-foreground">{item.authors?.join(", ")}</div>
              </CardHeader>

              <CardContent className="p-0 flex flex-col gap-2">
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>📚 {item.status}</span>
                  {item.rating && <span>⭐ {item.rating}/10</span>}
                </div>

                {item.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                )}
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
