import { Event } from "@/lib/models/Event";

export interface EventsPaginated {
  events: Event[];
  limit: number;
  total: number;
  totalPages: number;
  page: number;
}

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

export interface Ticket {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sold?: number;
  available?: boolean;
  type?: "standard" | "vip" | "early-bird";
  description?: string;
  salesEndDate?: string;
}
