import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddUserBookDto, UserBookStatus } from "@entities/user-book/model/models";
import { addUserBook, deleteUserBook, updateUserBook } from "@entities/user-book/api";
import { userBookKeys } from "@entities/user-book/model/keys";
import { mutationKeys } from "@shared/model/mutationKeys";

export const useAddUserBookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: AddUserBookDto) => addUserBook(dto),
    mutationKey: [userBookKeys.all, mutationKeys.add],
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
    mutationKey: [userBookKeys.all, mutationKeys.patch],
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
    mutationKey: [userBookKeys.all, mutationKeys.delete],
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: userBookKeys.all,
      });
    },
  });
};
