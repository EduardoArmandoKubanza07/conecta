import { fetchAnEvent, fetchEvents } from "@/lib/services/api/events_services";
import { useCallback } from "react";

export default function useGetEvents() {
  const getEvents = useCallback(fetchEvents, []);

  const getEvent = useCallback(fetchAnEvent, []);

  const getAllEvents = async <T>(): Promise<T> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/all`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error("Failed to fetch all events:", error);
      throw error;
    }
  };

  return { getEvents, getEvent, getAllEvents };
}
