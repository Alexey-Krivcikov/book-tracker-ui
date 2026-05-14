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
  const [isAddedLocally, setIsAddedLocally] = useState(book.isAdded || false);

  const isAdded = book.isAdded || isAddedLocally;

  const handleAdd = async () => {
    if (isAdded) return;

    setLoading(true);

    try {
      await addUserBook({
        externalId: book.externalId,
        title: book.title,
        authors: book.authors,
        description: book.description,
        cover: book.cover,
        status: UserBookStatus.PLANNED,
      });

      setIsAddedLocally(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (isAdded) return "В библиотеке";
    if (loading) return "Добавляем...";
    return "В библиотеку";
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={loading || isAdded}
      variant={isAdded ? "outline" : "secondary"}
    >
      {getButtonText()}
    </Button>
  );
};
