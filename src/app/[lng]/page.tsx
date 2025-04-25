"use client";
import { useEffect, useState } from "react";
import AuthHeader from "@/components/authHeader";
import EventCard from "@/components/eventCard";
import Footer from "@/components/footer";
import { WrapperContent } from "@/containers/WrapperContent";
import { homeBanner } from "@/images";
import { Event } from "@/lib/models/Event";
import { fetchEvents } from "@/lib/services/api/events_services";
import Image from "next/image";
import LoadingSpinner from "@/components/loadingSpinner";

export default function Home() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <>
      <AuthHeader />

      <div className="relative w-full">
        <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
          <Image
            src={homeBanner}
            alt="ConectaEventos Banner"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="brightness-75"
          />
          <div className="absolute inset-0 flex items-center">
            <WrapperContent>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white">ConectaEventos</h1>
              <p className="my-2 md:my-4 text-base md:text-lg font-normal text-white">
                O Lugar ideal para todos os seus eventos.
              </p>
            </WrapperContent>
          </div>
        </div>
      </div>

      <div className="py-8 md:py-12">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
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
          <WrapperContent>
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6">Eventos em Destaques</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {events.map((event, index) => (
                  <li key={event.id || index} className="flex justify-center">
                    <EventCard {...event} />
                  </li>
                ))}
              </ul>
            </section>

            {events.length > 4 && (
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6">Os melhores Eventos</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {events.slice(0, 4).map((event, index) => (
                    <li key={`best-${event.id || index}`} className="flex justify-center">
                      <EventCard {...event} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </WrapperContent>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold text-gray-700">Nenhum evento disponível</h2>
            <p className="mt-2 text-gray-500">Fique atento para novos eventos em breve!</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
