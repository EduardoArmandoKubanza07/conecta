"use client";

import useGetEvents from "@/hooks/useGetEvents";
import { Event } from "@/lib/models/Event";
import { EventsPaginated } from "@/types/events";
import Image from "next/image";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Sidebar } from "primereact/sidebar";
import { useEffect, useState } from "react";

export default function Events() {
  const [eventsData, setEventsData] = useState<EventsPaginated>({} as EventsPaginated);
  const [eventoSelecionado, setEventoSelecionado] = useState<Event | null>(null);
  const [sidebarVisivel, setSidebarVisivel] = useState(false);
  const { getEvents } = useGetEvents();

  useEffect(() => {
    getEvents<EventsPaginated>().then((e) => {
      setEventsData(e);
    });
  }, []);

  const abrirSidebar = (evento: Event) => {
    setEventoSelecionado(evento);
    setSidebarVisivel(true);
  };

  return (
    <section>
      <DataTable
        value={eventsData.events}
        paginator
        rows={eventsData.limit}
        rowsPerPageOptions={[eventsData.limit]}
        tableStyle={{ minWidth: "50rem" }}
        selectionMode="single"
        onRowSelect={(e) => abrirSidebar(e.data)}
      >
        <Column field="name" header="Nome do Evento" style={{ width: "25%" }}></Column>
        <Column field="category" header="Tipo" style={{ width: "15%" }}></Column>
        <Column field="promoter.name" header="Criado por" style={{ width: "20%" }}></Column>
        <Column field="date" header="Data" style={{ width: "20%" }}></Column>
        <Column field="location" header="Local" style={{ width: "20%" }}></Column>
      </DataTable>

      <Sidebar
        visible={sidebarVisivel}
        onHide={() => setSidebarVisivel(false)}
        position="right"
        style={{ width: "300px" }}
        className="bg-primary text-white p-5"
      >
        {eventoSelecionado && (
          <div className="flex flex-col gap-8">
            <h3>{eventoSelecionado.name}</h3>

            <div className="w-60 h-60 relative">
              <Image
                className="object-scale-down"
                src={eventoSelecionado.coverUrl}
                alt={"Event Cover " + eventoSelecionado.name}
                fill
              />
            </div>

            <p>
              <strong>Categoria:</strong> {eventoSelecionado.category}
            </p>
            <p>
              <strong>Criado por:</strong> {eventoSelecionado.promoter.name}
            </p>
            <p>
              <strong>Data:</strong> {new Date(eventoSelecionado.date).toDateString()}
            </p>

            <ul>
              {eventoSelecionado.tickets?.map((tck) => (
                <>
                  <li key={tck.id}>
                    <strong> {tck.name} </strong>
                    <p> {tck.description} </p>
                    <p> {tck.price} </p>
                  </li>
                </>
              ))}
            </ul>

            <Button
              label="Fechar"
              className="bg-white text-black h-11 w-full"
              onClick={() => setSidebarVisivel(false)}
            />
          </div>
        )}
      </Sidebar>
    </section>
  );
}
