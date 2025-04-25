export async function buildUrl(...path: string[]) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7892";

  return [apiURL, ...path].join("/");
}
