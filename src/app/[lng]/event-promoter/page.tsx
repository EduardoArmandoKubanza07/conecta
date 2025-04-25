"use client";

import EventCard from "@/components/eventCard";
import EventStatCard from "@/components/eventStatCard";
import { WrapperContent } from "@/containers/WrapperContent";
import useGetEvents from "@/hooks/useGetEvents";
import { Event } from "@/lib/models/Event";
import { EventsPaginated } from "@/types/events";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHandHoldingDollar, FaPlus, FaRegCalendarCheck } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { LuTickets } from "react-icons/lu";

export interface UserLoggedData {
  avatarurl: string;
  userId: string;
  name: {
    name: string;
    firstName: string;
    lastName: string;
  };
  email: string;
  role: string;
}

export default function EventOrganizerDashboard() {
  const eventStats = {
    total: {
      title: "Total de ingressos",
      number: 80,
    },
    sold: {
      title: "Ingressos vendidos",
      number: 80,
    },
    reserve: {
      title: "Ingressos em reserva",
      number: 80,
    },
  };

  const [eventsData, setEventsData] = useState<EventsPaginated>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("todos");
  const { getEvents } = useGetEvents();

  useEffect(() => {
    getEvents<EventsPaginated>().then((r) => {
      setEventsData(r);
    });
  }, [getEvents]);

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      <main className="">
        <WrapperContent>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <EventStatCard title={eventStats.total.title} number={eventStats.total.number}>
                <LuTickets className="text-3xl text-primary" />
              </EventStatCard>

              <EventStatCard title={eventStats.sold.title} number={eventStats.sold.number}>
                <FaHandHoldingDollar className="text-3xl text-green-600" />
              </EventStatCard>

              <EventStatCard title={eventStats.reserve.title} number={eventStats.reserve.number}>
                <FaRegCalendarCheck className="text-3xl text-amber-500" />
              </EventStatCard>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold text-primary">Meus eventos</h2>

              <Link href="/event-promoter/create-event">
                <button
                  className="flex items-center gap-2 transition-colors duration-300 bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-3 text-sm font-medium"
                  aria-label="Criar novo evento"
                >
                  <FaPlus className="text-sm" />
                  Criar novo evento
                </button>
              </Link>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                <div className="flex items-center gap-2 w-full lg:w-1/3 border rounded-xl p-2 border-gray-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                  <IoMdSearch className="text-xl text-gray-500" />
                  <input
                    type="search"
                    className="w-full bg-transparent outline-none p-2"
                    placeholder="Buscar eventos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Buscar eventos"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Filtrar por:</span>

                  <select
                    className="rounded-xl border border-gray-300 p-2 text-sm font-medium outline-none bg-white hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary"
                    aria-label="Filtrar por tipo de evento"
                  >
                    <option value="">Tipo de evento</option>
                    <option value="show">Show</option>
                    <option value="conference">Conferência</option>
                    <option value="workshop">Workshop</option>
                  </select>

                  <select
                    className="rounded-xl border border-gray-300 p-2 text-sm font-medium outline-none bg-white hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary"
                    aria-label="Filtrar por data"
                  >
                    <option value="">Data</option>
                    <option value="today">Hoje</option>
                    <option value="this-week">Esta semana</option>
                    <option value="this-month">Este mês</option>
                  </select>

                  <select
                    className="rounded-xl border border-gray-300 p-2 text-sm font-medium outline-none bg-white hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary"
                    aria-label="Filtrar por localidade"
                  >
                    <option value="">Localidade</option>
                    <option value="local">Local</option>
                    <option value="national">Nacional</option>
                    <option value="international">Internacional</option>
                  </select>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {["todos", "ativos", "passados", "futuros"].map((filter) => (
                  <button
                    key={filter}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      activeFilter === filter ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Events List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {eventsData && eventsData.events.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventsData.events.map((event: Event, index: number) => (
                    <EventCard key={index} {...event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">Nenhum evento encontrado</p>
                  <Link href="/event-promoter/create-event">
                    <button className="inline-flex items-center gap-2 bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors">
                      <FaPlus />
                      Criar seu primeiro evento
                    </button>
                  </Link>
                </div>
              )}

              {/* Pagination (if needed) */}
              {eventsData && eventsData.events.length > 0 && (
                <div className="flex justify-center mt-8">
                  <nav className="inline-flex rounded-md shadow-sm" aria-label="Paginação">
                    <button className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Anterior
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Próximo
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </WrapperContent>
      </main>
    </div>
  );
}
