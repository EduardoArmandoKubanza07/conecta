import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-AO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("pt-AO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
