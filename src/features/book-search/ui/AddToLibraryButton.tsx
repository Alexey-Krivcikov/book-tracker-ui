"use client";

import { useState } from "react";
import type { Book } from "@entities/book/model/book";
import { Button } from "@shared/ui/button";
import { UserBookStatus } from "@entities/user-book/model/models";
import { useQueryClient } from "@tanstack/react-query";
import { userBookKeys } from "@entities/user-book/model/keys";
import { useAddUserBookMutation } from "@entities/user-book/api";

type Props = {
  book: Book;
};

export const AddToLibraryButton = ({ book }: Props) => {
  const [isAddedLocally, setIsAddedLocally] = useState(book.isAdded);

  const addBook = useAddUserBookMutation();
  const queryClient = useQueryClient();
  const isAdded = book.isAdded || isAddedLocally;

  const handleAdd = () => {
    if (isAdded || addBook.isPending) return;

    addBook.mutate(
      {
        externalId: book.externalId,
        title: book.title,
        authors: book.authors,
        description: book.description,
        cover: book.cover,
        status: UserBookStatus.PLANNED,
      },
      {
        onSuccess: async () => {
          setIsAddedLocally(true);

          await queryClient.invalidateQueries({
            queryKey: userBookKeys.all,
          });
        },
      },
    );
  };

  const getButtonText = () => {
    if (isAdded) return "В библиотеке";
    if (addBook.isPending) return "Добавляем...";
    return "В библиотеку";
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={addBook.isPending || isAdded}
      variant={isAdded ? "outline" : "secondary"}
    >
      {getButtonText()}
    </Button>
  );
};
