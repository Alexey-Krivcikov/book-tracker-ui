import { auth } from "@shared/auth/auth";

const API_URL = "http://localhost:3001";

export async function serverFetch(input: string, init: RequestInit = {}) {
  const session = await auth();
  const token = session?.accessToken;

  const res = await fetch(`${API_URL}${input}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "API error");
  }

  return res;
}
