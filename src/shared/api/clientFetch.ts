import { getSession } from "next-auth/react";

const API_URL = "http://localhost:3001";

export async function clientFetch(input: string, init: RequestInit = {}) {
  const session = await getSession();
  const token = (session as any)?.accessToken;

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
