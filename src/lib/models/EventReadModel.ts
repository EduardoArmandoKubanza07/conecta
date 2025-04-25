import { Ticket } from "@/types/events";

export interface EventReadModel {
  id: string;
  coverUrl: string;
  imagesUrl: string[];
  name: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  tickets: Ticket[];
  promoter: {
    id: string;
    name: string;
    phone: string;
  };
  phone: string;
  createdAt?: string;
  updatedAt?: string;
  published?: boolean;
}
