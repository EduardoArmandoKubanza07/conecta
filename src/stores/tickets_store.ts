import { Ticket } from "@/types/events";
import { create } from "zustand";

export interface TicketsStore {
  tickets: Ticket[];
  increaseTicketQty: (tId: string) => void;
  decreaseTicketQty: (tId: string) => void;
  setTickets: (tickets: Ticket[]) => void;
}

export const useTicketsStore = create<TicketsStore>()((set) => ({
  tickets: [],
  setTickets: (tickets: Ticket[]) => set(() => ({ tickets: tickets })),
  increaseTicketQty: (tId: string) =>
    set((state: TicketsStore) => {
      const tcks = state.tickets.map((t) => {
        if (t.id === tId) {
          t.quantity = t.quantity + 1;
        }

        return t;
      });

      return { tickets: tcks };
    }),

  decreaseTicketQty: (tId: string) =>
    set((state: TicketsStore) => {
      const tcks = state.tickets.map((t) => {
        if (t.id === tId) {
          t.quantity = t.quantity >= 1 ? t.quantity - 1 : t.quantity;
        }

        return t;
      });

      return { tickets: tcks };
    }),
}));
