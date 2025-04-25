import { buildUrl } from "@/helpers/buildUrl";

export async function fetchEvents<T>(limit: number = 12, page: number = 1): Promise<T> {
  try {
    const url = await buildUrl(`events?limit=${limit}&page=${page}`);
    const res = await fetch(url);

    const response = await fetch(url, {
      credentials: "include",
      cache: "default",
    });

    if (!res.ok) throw new Error(`Erro na API: ${res.status}`);

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return {} as T;
  }
}

export async function fetchAnEvent<T>(eventId: string): Promise<T> {
  try {
    const url = await buildUrl("events/" + eventId);

    const response = await fetch(url, {
      credentials: "include",
      cache: "default",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }

    return response.json();
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
    return {} as T;
  }
}
