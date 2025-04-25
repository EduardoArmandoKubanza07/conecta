"use client";

import EventCard from "@/components/eventCard";
import useGetEvents from "@/hooks/useGetEvents";
import { cart, comments, facebook, less, location, phone, plus, twitter, whatsapp } from "@/images";
import { Event } from "@/lib/models/Event";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventInfo({
  params,
}: {
  params: {
    eventId: string;
  };
}) {
  const { eventId } = params;
  const [eventData, setEventData] = useState<Event>();
  const [relatedEvents, setRelatedEvents] = useState<{ events: Event[] }>();
  const [count, setCount] = useState(0);
  const router = useRouter();

  const handleBuyClick = () => {
    localStorage.setItem("eventData", JSON.stringify(eventData));
    router.push(`/events/${eventId}/buy`);
  };

  const handleAdd = () => setCount((prev) => prev + 1);
  const handleRemove = () => setCount((prev) => Math.max(prev - 1, 0));
  const { getEvent, getEvents } = useGetEvents();

  useEffect(() => {
    getEvent<Event>(eventId).then((r) => {
      setEventData(r);
    });

    getEvents<{ events: Event[] }>().then((r) => {
      setRelatedEvents(r);
    });
  }, [getEvent, getEvents, eventId]);

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="grid max-h-[555px] w-full grid-cols-4 grid-rows-2 rounded-2xl">
          {eventData &&
            eventData.imagesUrl.map((pic: string, index: number) => (
              <Image
                alt={pic}
                key={index}
                src={pic}
                fill
                className={`h-full w-full ${
                  index === 0
                    ? "col-span-2 row-span-2 rounded-l-2xl"
                    : index === 2
                    ? "rounded-tr-2xl"
                    : index === 4 && "rounded-br-2xl"
                }`}
              />
            ))}
        </div>
        {eventData ? (
          <div className="flex justify-between">
            <div className="flex w-full flex-col">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-semibold text-primary">{eventData.name}</h1>

                <div className="flex items-center gap-2 font-medium text-primary">
                  <Image alt="" src={location} width={30} height={30} /> {eventData.location}
                </div>
              </div>

              <div>
                <p className="text-xl font-semibold text-primary">Descrição do Evento</p>
                <p className="text-xl">{eventData.description}</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="flex font-semibold">
                  <Image src={comments} alt="" width={24} height={24} /> Contacto
                </p>

                <ul className="flex gap-4">
                  <li>
                    <Link href={"tel:".concat(eventData.phone)}>
                      <Image src={phone} alt="" width={24} height={24} />
                    </Link>
                  </li>
                  <li>
                    <Link href={"#"}>
                      <Image src={facebook} alt="" width={24} height={24} />
                    </Link>
                  </li>
                  <li>
                    <Link href={"#"}>
                      <Image src={whatsapp} alt="" width={24} height={24} />
                    </Link>
                  </li>
                  <li>
                    <Link href={"#"}>
                      <Image src={twitter} alt="" width={24} height={24} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex w-2/3 flex-col rounded-xl bg-darkBlue text-white">
              <div className="flex h-full max-h-20 items-center justify-between bg-primary/10 px-6 py-4 text-2xl font-semibold">
                <p className="">Tickets</p>

                <p className="flex gap-2">
                  <Image src={cart} alt="" width={30} height={30} /> ${eventData.tickets[0].price}
                </p>
              </div>

              <div className="flex flex-col gap-12 px-6 pb-11 pt-4">
                {eventData.tickets.map((tck) => (
                  <div className="flex items-end justify-between" key={tck.id}>
                    <div className="flex h-full w-full flex-col gap-2 font-semibold">
                      <p>{tck.name}</p>
                      <p>${tck.price}</p>
                      <p className="text-sm font-light"> {tck.description} </p>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={handleRemove}>
                        <Image src={less} alt="Remove" width={30} height={30} />
                      </button>
                      {count}
                      <button onClick={handleAdd}>
                        <Image src={plus} alt="Add" width={30} height={30} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex w-full flex-col gap-2">
                  <button
                    onClick={handleBuyClick}
                    className="w-full rounded-2xl bg-primary px-24 py-2.5 text-2xl font-semibold transition-opacity duration-300 hover:opacity-80"
                  >
                    Comprar
                  </button>

                  <button className="w-full rounded-2xl border border-primary px-24 py-2.5 text-2xl font-semibold transition-colors duration-300 hover:bg-primary/50">
                    Compartilhar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex w-full flex-col gap-8">
          <h3 className="text-4xl font-semibold text-primary">Eventos Relacionados</h3>

          <div className="flex gap-4">
            {relatedEvents
              ? relatedEvents.events.map((relatedEvent: Event, index: number) => (
                  <EventCard key={index} {...relatedEvent} />
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
