"use client";

import { useState } from "react";
import { addUserBook, UserBookStatus } from "@entities/user-book/api/userBooks.api";
import type { Book } from "@entities/book/model/book";
import { Button } from "@shared/ui/button";

type Props = {
  book: Book;
};

export const AddToLibraryButton = ({ book }: Props) => {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    setLoading(true);

    try {
      await addUserBook({
        title: book.title,
        authors: book.authors,
        description: book.description,
        cover: book.cover,
        status: UserBookStatus.PLANNED,
      });

      setAdded(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleAdd} disabled={loading || added} variant="secondary">
      {added ? "Добавлено" : loading ? "Добавляем..." : "В библиотеку"}
    </Button>
  );
};
