import type { Policy } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchPolicies(): Promise<Policy[]> {
  const response = await fetch(`${API_BASE_URL}/policies/List`);

  if (!response.ok) {
    throw new Error(`Failed to fetch policies: ${response.status}`);
  }

  return response.json();
}
