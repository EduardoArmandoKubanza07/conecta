"use client";

import EventCard from "@/components/eventCard";
import useGetEvents from "@/hooks/useGetEvents";
import { cart, less, plus } from "@/images";
import { Event } from "@/lib/models/Event";
import { useTicketsStore } from "@/stores/tickets_store";
import { EventsPaginated } from "@/types/events";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaFacebook, FaMapMarkerAlt, FaPhone, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

export default function EventInfo() {
  const router = useRouter();
  const params = useParams();
  const { eventId, lng } = params;
  const [eventData, setEventData] = useState<Event | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<EventsPaginated | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { tickets, increaseTicketQty, decreaseTicketQty, setTickets } = useTicketsStore();

  const handleBuyClick = () => {
    if (tickets.reduce((total, ticket) => total + ticket.quantity, 0) === 0) {
      toast.error("Please select at least one ticket to continue");
      return;
    }

    // Store both event data and tickets in localStorage
    if (eventData) {
      localStorage.setItem(
        "eventData",
        JSON.stringify({
          id: eventData.id,
          name: eventData.name,
          date: eventData.date,
          location: eventData.location,
          coverUrl: eventData.coverUrl,
        }),
      );

      // Store selected tickets in localStorage
      localStorage.setItem("selectedTickets", JSON.stringify(tickets));
    }

    router.push(`/${lng}/events/${eventId}/buy`);
  };

  const handleShareClick = () => {
    if (navigator.share && eventData) {
      navigator
        .share({
          title: eventData.name,
          text: `Check out this event: ${eventData.name}`,
          url: window.location.href,
        })
        .then(() => toast.success("Event shared successfully!"))
        .catch(() => toast.info("Sharing canceled or not supported"));
    } else {
      // Fallback - copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied to clipboard!");
    }
  };

  const { getEvent, getEvents } = useGetEvents();

  useEffect(() => {
    setIsLoading(true);
    setTickets([]);

    const fetchData = async () => {
      try {
        const eventResult = await getEvent<Event>(eventId as string);
        setEventData(eventResult);

        // Initialize tickets with quantities set to 0
        setTickets(
          eventResult.tickets.map((t) => ({
            name: t.name,
            id: t.id,
            quantity: 0,
            price: t.price,
            description: t.description,
          })),
        );

        // Fetch related events (perhaps by category or similar tags)
        const relatedResult = await getEvents<EventsPaginated>(4);
        setRelatedEvents(relatedResult);
      } catch (error) {
        console.error("Error fetching event data:", error);
        toast.error("Failed to load event details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getEvent, getEvents, eventId, setTickets]);

  // Format date nicely
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time nicely
  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalTicketPrice = tickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0);
  const totalTicketCount = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        // Loading state
        <EventSkeleton />
      ) : eventData ? (
        <>
          <div className="flex flex-col gap-4 py-8">
            <h1 className="text-4xl font-semibold text-primary">{eventData.name}</h1>
            <div className="flex flex-wrap gap-4 text-lg">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                <span>{formatEventDate(eventData.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-primary" />
                <span>{formatEventTime(eventData.date)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Event image */}
              <div className="w-full rounded-xl overflow-hidden shadow-md">
                <img src={eventData.coverUrl} alt={`${eventData.name} Cover`} className="w-full h-auto object-cover" />
              </div>

              {/* Event details */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-2 text-lg mb-6">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                  <span className="font-medium">{eventData.location}</span>
                </div>

                <h2 className="text-2xl font-semibold text-primary mb-4">About This Event</h2>
                <p className="text-lg leading-relaxed whitespace-pre-line mb-6">{eventData.description}</p>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-3">Contact</h3>
                  <div className="flex gap-5 text-xl">
                    <Link
                      href={`tel:${eventData.phone}`}
                      className="text-gray-700 hover:text-primary transition-colors"
                    >
                      <FaPhone />
                    </Link>
                    <Link href="#" className="text-gray-700 hover:text-primary transition-colors">
                      <FaFacebook />
                    </Link>
                    <Link href="#" className="text-gray-700 hover:text-primary transition-colors">
                      <FaWhatsapp />
                    </Link>
                    <Link href="#" className="text-gray-700 hover:text-primary transition-colors">
                      <FaTwitter />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Gallery section - only displayed if there are images */}
              {eventData.imagesUrl && eventData.imagesUrl.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">Gallery</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {eventData.imagesUrl.map((imageUrl, index) => (
                      <div key={index} className="rounded-lg overflow-hidden shadow-md">
                        <img
                          src={imageUrl}
                          alt={`${eventData.name} - Image ${index + 1}`}
                          className="w-full h-64 object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tickets section */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="rounded-xl shadow-lg overflow-hidden bg-white">
                  <div className="bg-darkBlue text-white p-5 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Ingressos</h2>
                    <div className="flex items-center gap-2">
                      <Image src={cart} alt="Cart" width={24} height={24} />
                      <span className="font-semibold">
                        {totalTicketCount} | {totalTicketPrice.toFixed(2)} AOA
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Ticket list */}
                    <div className="space-y-6 mb-8">
                      {eventData.tickets &&
                        eventData.tickets.map((ticket) => {
                          const currentTicket = tickets.find((t) => t.id === ticket.id);
                          const quantity = currentTicket ? currentTicket.quantity : 0;

                          return (
                            <div key={ticket.id} className="border-b pb-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg">{ticket.name}</h3>
                                  <p className="text-primary font-medium">{ticket.price.toFixed(2)} AOA</p>
                                  <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => decreaseTicketQty(ticket.id)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                    disabled={quantity <= 0}
                                  >
                                    <Image src={less} alt="Decrease" width={16} height={16} />
                                  </button>

                                  <span className="w-6 text-center font-medium">{quantity}</span>

                                  <button
                                    onClick={() => increaseTicketQty(ticket.id)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                  >
                                    <Image src={plus} alt="Increase" width={16} height={16} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-3">
                      <Button
                        onClick={handleBuyClick}
                        className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl text-lg font-semibold"
                        disabled={totalTicketCount === 0}
                      >
                        Buy Tickets
                      </Button>

                      <Button
                        onClick={handleShareClick}
                        className="w-full border border-primary text-primary bg-transparent hover:bg-primary/10 py-3 rounded-xl text-lg font-semibold"
                      >
                        Share Event
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related events section */}
          {relatedEvents && relatedEvents.events.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-semibold text-primary mb-6">Related Events</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedEvents.events.map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl text-gray-600">Event not found or has been removed</h2>
          <Link href={`/${lng}/events`} className="text-primary hover:underline mt-4 inline-block">
            Browse other events
          </Link>
        </div>
      )}
    </div>
  );
}

// Skeleton loader component for loading state
function EventSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="animate-pulse h-12 w-3/4" />
        <div className="animate-pulse h-6 w-1/3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="animate-pulse h-[400px] w-full rounded-xl" />

          <div className="space-y-4">
            <div className="animate-pulse h-8 w-48" />
            <div className="animate-pulse h-20 w-full" />
            <div className="animate-pulse h-20 w-full" />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="animate-pulse h-[400px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
