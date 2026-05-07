import { baseFetch } from "@shared/api/base";

export const getMe = () => {
  return baseFetch("/auth/me");
};
