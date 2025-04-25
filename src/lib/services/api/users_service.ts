import { buildUrl } from "@/helpers/buildUrl";
import { getToken } from "@/helpers/getToken";

export async function fetchUsers<T>(limit: number = 12, page: number = 1): Promise<T> {
  try {
    const url = await buildUrl(`users?limit=${limit}&page=${page}`);
    const token = await getToken();
    const res = await fetch(url);

    const response = await fetch(url, {
      credentials: "include",
      cache: "default",
      headers: {
        "x-access-token": token,
      },
    });

    if (!res.ok) throw new Error(`Erro na API: ${res.status}`);

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return {} as T;
  }
}
