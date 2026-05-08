export async function baseFetch(input: string, init?: RequestInit) {
  const API_URL = "http://localhost:3001";

  const request = async () =>
    fetch(`${API_URL}${input}`, {
      ...init,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
    });

  let res = await request();

  if (res.status === 401) {
    await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    res = await request();
  }

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(errorBody || "API error");
  }

  return res;
}
