import type { AnswerResponse, HintResponse, Mystery } from "./types";

const API_URL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "";

async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}/api/mysteries${path}`, options);

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message =
      data && typeof data.error === "string"
        ? data.error
        : "The request failed. Please try again.";
    throw new Error(message);
  }

  return (await response.json()) as T;
}

export function getMysteries(): Promise<Mystery[]> {
  return apiRequest<Mystery[]>("");
}

export function getMysteryById(id: string): Promise<Mystery> {
  return apiRequest<Mystery>(`/${encodeURIComponent(id)}`);
}

export function submitAnswer(
  id: string,
  answer: string,
): Promise<AnswerResponse> {
  return apiRequest<AnswerResponse>(`/${encodeURIComponent(id)}/answers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer }),
  });
}

export function requestHint(id: string): Promise<HintResponse> {
  return apiRequest<HintResponse>(`/${encodeURIComponent(id)}/hint`, {
    method: "PATCH",
  });
}
