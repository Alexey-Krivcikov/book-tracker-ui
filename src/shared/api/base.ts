import { getSession } from "next-auth/react";

export async function baseFetch(input: string, init: RequestInit = {}) {
  const API_URL = "http://localhost:3001";

  const session = await getSession();
  const accessToken = session?.accessToken;

  const res = await fetch(`${API_URL}${input}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "API error");
  }

  return res;
}
