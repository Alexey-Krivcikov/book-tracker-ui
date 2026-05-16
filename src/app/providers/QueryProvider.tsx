"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/api/query-client";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const QueryProvider = ({ children }: Props) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
