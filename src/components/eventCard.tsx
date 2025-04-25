"use client";

import { useAuthStore } from "@/stores/auth_store";
import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaClock, FaHeart, FaMapPin } from "react-icons/fa";
import { useState } from "react";

export interface EventCardProps {
  coverUrl: string;
  name: string;
  date: string;
  location: string;
  id: string;
  admin?: boolean;
  time: string;
  onClickSee?: () => void;
  onClickUnpublish?: () => void;
  isFavorite?: boolean;
}

export default function EventCard({
  coverUrl,
  name,
  date,
  location,
  id,
  time,
  onClickSee,
  onClickUnpublish,
  isFavorite = false,
}: EventCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [imageError, setImageError] = useState(false);
  const { userData } = useAuthStore();

  // Format date properly handling both string and Date objects
  const eventDate = new Date(date);
  const isValidDate = !isNaN(eventDate.getTime());

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking heart
    setFavorite(!favorite);
    // You can add API call here to save favorite status
  };

  return (
    <div className="h-full w-full">
      <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-primary">
        {/* Card Image Section */}
        <div className="relative h-48 w-full overflow-hidden">
          <Link href={`/events/${id}`} className="block h-full w-full">
            {!imageError ? (
              <Image
                src={coverUrl}
                alt={`${name} event`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
                <span className="text-gray-500 dark:text-gray-400">Image not available</span>
              </div>
            )}

            <button
              onClick={toggleFavorite}
              className="absolute bottom-2 right-2 rounded-full bg-white/80 p-2 text-primary transition-all hover:bg-white dark:bg-primary/80 dark:text-white hover:dark:bg-primary"
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <FaHeart
                size={22}
                className={`${favorite ? "text-red-500 dark:text-red-500" : "text-gray-400 dark:text-gray-300"} transition-colors`}
              />
            </button>
          </Link>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <Link href={`/events/${id}`} className="block">
            <h2 className="mb-2 line-clamp-2 text-lg font-bold text-gray-800 hover:text-primary dark:text-white dark:hover:text-gray-200">
              {name}
            </h2>
          </Link>

          <div className="mt-auto space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {isValidDate && (
              <div className="flex items-center gap-2">
                <FaCalendar className="text-primary dark:text-gray-300" />
                <span className="line-clamp-1">
                  {eventDate.toLocaleDateString("pt-AO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "short",
                  })}
                </span>
              </div>
            )}

            {location && (
              <div className="flex items-center gap-2">
                <FaMapPin className="text-primary dark:text-gray-300" />
                <span className="line-clamp-1">{location}</span>
              </div>
            )}

            {time && (
              <div className="flex items-center gap-2">
                <FaClock className="text-primary dark:text-gray-300" />
                <span>{time}</span>
              </div>
            )}
          </div>
        </div>

        {userData?.role === "admin" && (
          <div className="flex flex-col sm:flex-row gap-2 p-4 pt-0">
            <button
              onClick={onClickSee}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 dark:bg-white dark:text-primary dark:hover:bg-gray-200"
            >
              Ver
            </button>

            <button
              onClick={onClickUnpublish}
              className="rounded-md border border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 dark:border-white dark:text-white dark:hover:bg-white/10"
            >
              Despublicar
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
