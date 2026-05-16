import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddUserBookDto, UserBookStatus } from "@entities/user-book/model/user-book";
import { addUserBook, deleteUserBook, updateUserBook } from "@entities/user-book/api";
import { userBookKeys } from "@entities/user-book/model/keys";

export const useAddUserBookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: AddUserBookDto) => addUserBook(dto),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: userBookKeys.all,
      });
    },
  });
};

export const useUpdateUserBookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: {
        status?: UserBookStatus;
        rating?: number;
      };
    }) => updateUserBook(id, payload),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: userBookKeys.all,
      });
    },
  });
};

export const useDeleteUserBookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUserBook(id),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: userBookKeys.all,
      });
    },
  });
};
