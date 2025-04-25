"use client";

import { Ticket } from "@/types/events";
import { Editor } from "primereact/editor";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddTicketModal({
  tickets,
  setTickets,
}: {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
}) {
  const [ticketDescription, setTicketDecription] = useState("");
  const [newTicket, setNewTicket] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
  });

  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.name || !newTicket.price || !newTicket.quantity) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    const ticket: Ticket = {
      id: crypto.randomUUID(),
      name: newTicket.name,
      description: newTicket.description,
      price: Number(newTicket.price),
      quantity: Number(newTicket.quantity),
    };

    setTickets([...tickets, ticket]);
    setNewTicket({ name: "", price: "", quantity: "", description: "" });
    setTicketDecription("");
    toast.success("Ingresso adicionado com sucesso!");
  };

  const handleRemoveTicket = (id: string) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
    toast.success("O Ingresso foi removido com sucesso");
  };

  return (
    <div>
      <div
        id="add-ticket-modal"
        className="hidden fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 gap-4"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <h2 className="text-xl font-bold mb-4">Adicionar Tickets ao Evento</h2>
          <form onSubmit={handleAddTicket} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Nome do Ticket
              </label>
              <input
                id="name"
                type="text"
                value={newTicket.name}
                onChange={(e) => setNewTicket({ ...newTicket, name: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Ex: Ingresso VIP"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Descrição do Ticket
              </label>
              <input
                id="description"
                type="text"
                value={newTicket.description}
                hidden
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Ex: Ingresso VIP"
              />
              <Editor
                id="ticket-description-editor"
                value={ticketDescription}
                onTextChange={(e) => {
                  setTicketDecription(e.htmlValue ?? "");
                  setNewTicket({ ...newTicket, description: e.htmlValue as string });
                }}
                style={{ height: "200px" }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium">
                  Preço (AOA)
                </label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={newTicket.price}
                  onChange={(e) => setNewTicket({ ...newTicket, price: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="quantity" className="block text-sm font-medium">
                  Quantidade
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newTicket.quantity}
                  onChange={(e) => setNewTicket({ ...newTicket, quantity: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="100"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Adicionar Ticket
            </button>
          </form>

          <button
            onClick={() => document.getElementById("add-ticket-modal")?.classList.add("hidden")}
            className="mt-4 w-full text-center text-gray-600 underline"
          >
            Fechar
          </button>
        </div>

        {tickets.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg  max-w-md p-6">
            <div className="mt-6 border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Tickets Adicionados</h3>
              {tickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">{ticket.name}</p>
                    <p className="text-sm text-gray-500">
                      {ticket.price.toFixed(2)} AOA- {ticket.quantity} unidades
                    </p>
                  </div>
                  <button onClick={() => handleRemoveTicket(ticket.id)} className="text-destructive hover:text-red-700">
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
