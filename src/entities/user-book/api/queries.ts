import { useQuery } from "@tanstack/react-query";
import { getUserBooks } from "./getUserBooks";
import { userBookKeys } from "@entities/user-book/model/keys";

export const useUserBooksQuery = () => {
  return useQuery({
    queryKey: userBookKeys.all,
    queryFn: getUserBooks,
  });
};
