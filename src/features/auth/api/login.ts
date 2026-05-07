import { baseFetch } from "@shared/api/base";

export const login = async (data: { email: string; password: string }) => {
  return await baseFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
