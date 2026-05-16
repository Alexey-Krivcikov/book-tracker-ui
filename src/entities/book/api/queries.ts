import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "./searchBooks";

export const useSearchBooksQuery = (query: string) => {
  return useQuery({
    queryKey: ["books", query],
    queryFn: () => searchBooks(query),
    enabled: !!query,
  });
};
