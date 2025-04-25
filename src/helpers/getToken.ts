export async function getToken(): Promise<string> {
  const sessionData = sessionStorage.getItem("session") || "";

  return sessionData;
}
