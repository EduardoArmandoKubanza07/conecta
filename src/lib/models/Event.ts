import { Ticket } from "@/types/events";

export interface Event {
  id: string;
  coverUrl: string;
  imagesUrl: string[];
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  tickets: Ticket[];
  promoter: {
    id: string;
    email: string;
    name: string;
    phone: string;
  };
  phone: string;
}
