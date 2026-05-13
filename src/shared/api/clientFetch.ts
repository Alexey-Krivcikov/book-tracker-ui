import { getSession } from "next-auth/react";
import { API_URL } from "@shared/config/api";
import { Session } from "next-auth";

export async function clientFetch(input: string, init: RequestInit = {}) {
  const session = await getSession();
  const token = (session as Session)?.accessToken;

  const res = await fetch(`${API_URL}${input}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res;
}
