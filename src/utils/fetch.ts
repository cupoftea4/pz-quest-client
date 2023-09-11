type FetchOptions = Omit<RequestInit, "body" | "method">;
type FetchMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const FETCH_ORIGIN = `http://localhost:2023`;


export function fetchJson<T>(
  path: string, 
  method: FetchMethod = "GET",
  body?: Record<string, unknown>, 
  otherOptions?: FetchOptions
) {
  const headers: HeadersInit  = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  return fetch(FETCH_ORIGIN + path, {
      method,
      headers,
      body: JSON.stringify(body),
      ...otherOptions
    }).then(async (res) => {
      if (!res.ok){ 
        throw new Error((await res.json())?.message ?? res.statusText);
      }
      return <Promise<T>>res.json();
    });
}
