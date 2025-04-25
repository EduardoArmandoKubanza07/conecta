"use client";
import { useEffect, useState } from "react";
import AuthHeader from "@/components/authHeader";
import EventCard from "@/components/eventCard";
import Footer from "@/components/footer";
import { WrapperContent } from "@/containers/WrapperContent";
import { Event } from "@/lib/models/Event";
import { fetchEvents } from "@/lib/services/api/events_services";
import LoadingSpinner from "@/components/loadingSpinner";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    location: "",
    capacity: "",
  });

  useEffect(() => {
    const getEvents = async () => {
      try {
        const result = await fetchEvents<{ events: Event[] }>();
        setEvents(result.events);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getEvents();
  }, []);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <>
      <AuthHeader />
      <WrapperContent>
        <div className="flex flex-col md:flex-row md:items-center w-full justify-between gap-6 mt-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-primary">A Procura de Evento</h1>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-medium">Filtrar por</p>
            <div className="group rounded-xl border border-primary p-2 md:p-3 text-lg font-light hover:bg-primary hover:text-white transition-colors">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="bg-transparent text-base md:text-lg font-light outline-none group-hover:bg-primary cursor-pointer"
              >
                <option value="">Categoria</option>
                <option value="música">Música</option>
                <option value="teatro">Teatro</option>
                <option value="esporte">Esporte</option>
              </select>
            </div>

            <div className="group rounded-xl border border-primary p-2 md:p-3 text-lg font-light hover:bg-primary hover:text-white transition-colors">
              <select
                value={filters.date}
                onChange={(e) => handleFilterChange("date", e.target.value)}
                className="bg-transparent text-base md:text-lg font-light outline-none group-hover:bg-primary cursor-pointer"
              >
                <option value="">Data</option>
                <option value="today">Hoje</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mês</option>
              </select>
            </div>

            <div className="group rounded-xl border border-primary p-2 md:p-3 text-lg font-light hover:bg-primary hover:text-white transition-colors">
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="bg-transparent text-base md:text-lg font-light outline-none group-hover:bg-primary cursor-pointer"
              >
                <option value="">Localidade</option>
                <option value="sp">São Paulo</option>
                <option value="rj">Rio de Janeiro</option>
                <option value="mg">Minas Gerais</option>
              </select>
            </div>

            <div className="group rounded-xl border border-primary p-2 md:p-3 text-lg font-light hover:bg-primary hover:text-white transition-colors">
              <select
                value={filters.capacity}
                onChange={(e) => handleFilterChange("capacity", e.target.value)}
                className="bg-transparent text-base md:text-lg font-light outline-none group-hover:bg-primary cursor-pointer"
              >
                <option value="">Capacidade</option>
                <option value="small">Pequeno (até 50)</option>
                <option value="medium">Médio (50-200)</option>
                <option value="large">Grande (200+)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="py-8 min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-[300px]">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center p-8">
              <p className="text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                Try Again
              </button>
            </div>
          ) : events && events.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-8">
              {events.map((event, index) => (
                <li key={event.id || index} className="flex justify-center">
                  <EventCard {...event} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center p-8">
              <h2 className="text-2xl font-semibold text-gray-700">Nenhum evento disponível</h2>
              <p className="mt-2 text-gray-500">Não encontramos eventos com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </WrapperContent>
      <Footer />
    </>
  );
}
