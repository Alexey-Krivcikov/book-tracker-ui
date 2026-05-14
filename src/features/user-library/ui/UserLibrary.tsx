"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { getUserBooks } from "../api/getUserBooks";
import { updateUserBook } from "../api/updateUserBook";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select";
import { Trash2 } from "lucide-react";
import { UserBookStatus } from "@entities/user-book/api/userBooks.api";
import { deleteUserBook } from "@features/user-library/api/deleteUserBook";
import { Button } from "@shared/ui/button";

type UserBook = {
  id: string;
  title: string;
  authors: string[];
  cover?: string;
  status: UserBookStatus;
  rating?: number;
  description?: string;
};

const statuses: {
  value: UserBookStatus;
  label: string;
}[] = [
  {
    value: UserBookStatus.PLANNED,
    label: "Запланировано",
  },
  {
    value: UserBookStatus.READING,
    label: "Читаю",
  },
  {
    value: UserBookStatus.COMPLETED,
    label: "Прочитано",
  },
  {
    value: UserBookStatus.DROPPED,
    label: "Брошено",
  },
];

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

  const handleUpdate = async (
    id: string,
    payload: {
      status?: UserBookStatus;
      rating?: number;
    },
  ) => {
    try {
      const updated = await updateUserBook(id, payload);

      setBooks((prev) =>
        prev.map((book) =>
          book.id === id
            ? {
                ...book,
                ...updated,
              }
            : book,
        ),
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUserBook(id);

      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Загрузка библиотеки...</div>;
  }

  if (!books.length) {
    return <div className="text-sm text-muted-foreground">Библиотека пока пустая</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-5xl">
      {books.map((item) => (
        <Card key={item.id} className="overflow-hidden max-h-fit">
          <div className="flex gap-5 p-4">
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

            <div className="flex flex-col gap-4 flex-1">
              <CardHeader className="p-0 space-y-1">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    className="text-muted-foreground hover:text-red-500 hover:bg-red-50 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">{item.authors?.join(", ")}</div>

                {item.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                )}
              </CardHeader>

              <CardContent className="p-0 flex flex-col gap-4 min-w-0">
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground">Статус</span>

                    <Select
                      value={item.status}
                      onValueChange={(value) =>
                        handleUpdate(item.id, {
                          status: value as UserBookStatus,
                        })
                      }
                    >
                      <SelectTrigger className="min-w-[180px]">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent position="popper" align="start">
                        {statuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground">Оценка</span>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const value = index + 1;
                        const active = value <= (item.rating || 0);

                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() =>
                              handleUpdate(item.id, {
                                rating: value,
                              })
                            }
                            className="transition hover:scale-110"
                          >
                            <Star
                              className={`h-4 w-4 ${
                                active ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
