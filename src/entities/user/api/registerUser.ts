import { clientFetch } from "@shared/api/clientFetch";

type RegisterDto = {
  email: string;
  password: string;
};

export async function registerUser(dto: RegisterDto) {
  const res = await clientFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(dto),
  });

  return res.json();
}
