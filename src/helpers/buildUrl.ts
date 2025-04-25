export async function buildUrl(...path: string[]) {
  const apiURL = "http://localhost:7892";

  return [apiURL, ...path].join("/");
}
