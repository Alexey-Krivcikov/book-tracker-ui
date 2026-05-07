import { cookies } from "next/headers";
import { baseFetch } from "@shared/api/base";

export async function verifySession() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    return null;
  }

  const response = await baseFetch("/auth/me", {
    headers: {
      Cookie: `access_token=${accessToken}`,
    },
    cache: "no-store",
  });
  console.log(response);

  if (!response.ok) {
    return null;
  }

  return response.json();
}
