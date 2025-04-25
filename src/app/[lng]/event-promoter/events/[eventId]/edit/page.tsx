"use client";

import { useTranslation } from "@/app/i18n/client";
import { WrapperContent } from "@/containers/WrapperContent";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Editor } from "primereact/editor";
import Image from "next/image";
import AddTicketModal from "@/components/modals/AddTicketModal";
import { eventCategories } from "@/lib/data/event_categories";
import { Ticket } from "@/types/events";
import { Event } from "@/lib/models/Event";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loadingSpinner";
import { toast } from "react-toastify";
import useGetEvents from "@/hooks/useGetEvents";
import { updateEvent } from "@/actions/event";

export default function EditEventPage({ params }: { params: { eventId: string; lng: string } }) {
  const { eventId, lng } = params;
  const { t } = useTranslation(lng, "create-event-form");
  const router = useRouter();
  const [state, action] = useFormState(updateEvent, undefined);
  const { getEvent } = useGetEvents();

  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [eventDescription, setEventDescription] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [coverImage, setCoverImage] = useState<File | undefined>();
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const eventData = await getEvent<Event>(eventId);

        if (!eventData) {
          toast.error("Event not found");
          router.push(`/${lng}/event-promoter/events`);
          return;
        }

        setEvent(eventData);
        setEventDescription(eventData.description || "");
        setExistingImages(eventData.imagesUrl || []);

        // Convert ticket data structure if needed
        if (eventData.tickets) {
          setTickets(
            eventData.tickets.map((ticket) => ({
              id: ticket.id || Math.random().toString(),
              name: ticket.name,
              description: ticket.description || "",
              price: ticket.price,
              quantity: ticket.quantity || 0,
              sold: ticket.sold || 0,
            })),
          );
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
        toast.error("Failed to load event data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, getEvent, lng, router]);

  function handleRemoveGalleryImage(index: number) {
    const leftPart = galleryImages.slice(0, index);
    const rightPart = galleryImages.slice(index + 1, galleryImages.length + 1);
    setGalleryImages([...leftPart, ...rightPart]);
  }

  function handleRemoveExistingImage(index: number) {
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
  }

  const formatEventDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const formatEventTime = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  const handleSubmit = async (formData: FormData) => {
    formData.append("eventId", eventId);
    formData.append("name", formData.get("name") as string);
    formData.append("date", formData.get("date") as string);
    formData.append("time", formData.get("time") as string);
    formData.append("location", formData.get("location") as string);
    formData.append("description", eventDescription);
    formData.append("category", formData.get("category") as string);
    formData.append("entity", formData.get("entity") as string);
    formData.append("tickets", JSON.stringify(tickets));
    formData.append("existingImages", JSON.stringify(existingImages));

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    galleryImages.forEach((image) => {
      formData.append("additionalImages", image);
    });

    await action(formData);
  };

  if (!event) {
    return (
      <WrapperContent>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold text-primary mb-4">Event not found</h2>
          <button
            onClick={() => router.push(`/${lng}/event-promoter/events`)}
            className="rounded-lg bg-primary px-6 py-2 text-white hover:bg-primary/90"
          >
            Back to Events
          </button>
        </div>
      </WrapperContent>
    );
  }

  if (isLoading) {
    return (
      <WrapperContent>
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </WrapperContent>
    );
  }

  return (
    <>
      <WrapperContent>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-primary">Edit Event: {event.name}</h1>
          <button
            onClick={() => router.push(`/${lng}/event-promoter/events`)}
            className="rounded-lg border border-primary bg-transparent px-6 py-2 text-primary hover:bg-primary/10"
          >
            Back to Events
          </button>
        </div>

        <form action={handleSubmit} className="m-auto flex flex-col gap-4">
          <div className="form-layout">
            <h2 className="text-3xl font-bold text-primary mb-4">{t("eventInfo")}</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 flex flex-col gap-2">
                <label htmlFor="event-name" className="text-base">
                  {t("eventName")}
                </label>
                <input
                  type="text"
                  id="event-name"
                  name="name"
                  defaultValue={event.name}
                  placeholder={t("eventNamePlaceholder")}
                  className="input-style"
                />
                {state?.errors?.name && <p className="form-error-label">{state.errors.name}</p>}
              </div>

              <div className="flex w-full flex-col gap-2">
                <label htmlFor="event-date" className="text-base">
                  {t("eventDate")}
                </label>
                <input
                  className="input-style"
                  type="date"
                  id="event-date"
                  name="date"
                  defaultValue={formatEventDate(event.date)}
                />
                {state?.errors?.date && <p className="form-error-label">{state?.errors?.date}</p>}
              </div>

              <div className="flex w-full flex-col gap-2">
                <label htmlFor="event-time" className="text-base">
                  {t("eventTime")}
                </label>
                <input
                  type="time"
                  className="input-style"
                  id="event-time"
                  name="time"
                  defaultValue={formatEventTime(event.date)}
                />
                {state?.errors?.time && <p className="form-error-label">{state?.errors?.time}</p>}
              </div>
            </div>
          </div>

          <div className="form-layout">
            <h2 className="text-3xl font-bold text-primary mb-4">{t("coverImage")}</h2>
            <p className="text-base mb-4">{t("coverImageDetails")}</p>

            <div className="flex gap-4">
              <div className="relative flex flex-col w-full gap-2">
                <label
                  htmlFor="cover-image"
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-6 py-4 text-white"
                >
                  {t("updateCoverImage")}
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="cover-image"
                  name="coverImage"
                  accept="image/*"
                  multiple={false}
                  onChange={(e) => {
                    if (e.target.files) {
                      setCoverImage(e.target.files[0]);
                    }
                  }}
                />

                {/* Show current cover image if no new one selected */}
                {!coverImage && event.coverUrl && (
                  <div className="relative mt-2">
                    <Image
                      src={event.coverUrl}
                      alt="Current cover"
                      width={400}
                      height={200}
                      className="w-full rounded-lg object-cover h-[200px]"
                    />
                    <p className="mt-1 text-sm text-gray-500">Current cover image</p>
                  </div>
                )}

                {/* Show new cover image preview */}
                {coverImage && (
                  <div className="relative mt-2">
                    <Image
                      src={URL.createObjectURL(coverImage)}
                      alt="New cover"
                      width={400}
                      height={200}
                      className="w-full rounded-lg object-cover h-[200px]"
                    />
                    <p className="mt-1 text-sm text-gray-500">New cover image</p>
                  </div>
                )}
              </div>

              <div className="relative flex flex-col w-full gap-2">
                <label
                  htmlFor="gallery-image"
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-primary bg-[#f4f4f4] px-6 py-4 text-primary"
                >
                  {t("addMoreImages")}
                </label>
                <input
                  type="file"
                  className="hidden"
                  multiple={true}
                  id="gallery-image"
                  name="additionalImages"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setGalleryImages([...e.target.files]);
                    }
                  }}
                />

                {/* Existing gallery images */}
                {existingImages.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2">Current gallery images</p>
                    <ul className="flex flex-wrap gap-2">
                      {existingImages.map((imgUrl, idx) => (
                        <li className="relative" key={idx}>
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
                          >
                            ×
                          </button>
                          <Image
                            src={imgUrl}
                            alt={`Gallery image ${idx}`}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover h-[100px] w-[100px]"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* New gallery images preview */}
                {galleryImages.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">New images to add</p>
                    <ul className="flex flex-wrap gap-2">
                      {galleryImages.map((img, idx) => (
                        <li className="relative" key={idx}>
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
                          >
                            ×
                          </button>
                          <Image
                            src={URL.createObjectURL(img)}
                            alt={`New gallery image ${idx}`}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover h-[100px] w-[100px]"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-layout">
            <h2 className="text-3xl font-bold text-primary mb-4">{t("eventLocation")}</h2>

            <div className="flex flex-col gap-4">
              <label htmlFor="event-location" className="text-base">
                {t("eventLocationInfo")}
              </label>
              <input
                type="text"
                id="event-location"
                name="location"
                defaultValue={event.location}
                placeholder={t("eventLocationPlaceholder")}
                className="input-style"
              />
              {state?.errors?.location && <p className="form-error-label">{state.errors.location}</p>}
            </div>
          </div>

          <div className="form-layout">
            <h2 className="text-3xl font-bold text-primary mb-4">{t("eventDetails")}</h2>

            <div className="flex w-full flex-col gap-4">
              <p>{t("eventDetailsHint")}</p>
              <input type="text" className="hidden" readOnly value={eventDescription} name="description" />
              <Editor
                id="event-description"
                className="h-96"
                value={eventDescription}
                onTextChange={(e) => setEventDescription(e.htmlValue as string)}
                style={{ height: "320px" }}
              />
              {state?.errors?.description && <p className="form-error-label">{state.errors.description}</p>}
            </div>

            <div className="flex w-full flex-col gap-4 mt-4">
              <label htmlFor="event-category" className="text-base">
                {t("eventCategory")}
              </label>
              <select
                title={t("eventCategoryPlaceholder")}
                className="input-style"
                name="category"
                id="event-category"
                defaultValue={event.category}
              >
                {eventCategories.map((category, _idx) => (
                  <option key={_idx} value={category.key}>
                    {category.title}
                  </option>
                ))}
              </select>
              {state?.errors?.category && <p className="form-error-label">{state.errors.category}</p>}
            </div>
          </div>

          <div className="form-layout">
            <h2 className="text-3xl font-bold text-primary mb-4">{t("eventOrganizer")}</h2>

            <div className="flex w-full flex-col gap-4">
              <label htmlFor="event-entity" className="text-base">
                {t("organizerEntity")}
              </label>
              <input
                type="text"
                className="input-style"
                id="event-entity"
                name="entity"
                defaultValue={event.promoter.email || ""}
                placeholder={t("organizerEntityPlaceholder")}
              />
              {state?.errors?.entity && <p className="form-error-label">{state.errors.entity}</p>}
            </div>
          </div>

          <div className="form-layout">
            <h2 className="text-3xl font-bold text-primary mb-4">{t("tickets")}</h2>
            {tickets.length > 0 && (
              <div className="mt-2 border rounded-lg p-4 space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">{ticket.name}</p>
                      <p className="text-sm text-gray-500">
                        {ticket.price.toFixed(2)} AOA - {ticket.quantity} unidades
                      </p>
                      <p className="text-xs text-gray-400">Sold: {ticket.sold || 0}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <input
              type="text"
              value={JSON.stringify(tickets)}
              readOnly
              className="hidden"
              name="tickets"
              id="tickets"
            />
            <button
              type="button"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4"
              onClick={() => document.getElementById("add-ticket-modal")?.classList.remove("hidden")}
            >
              <span className="mr-2">+</span>Manage Tickets
            </button>
            {state?.errors?.tickets && <p className="form-error-label mt-2">{state.errors.tickets}</p>}
          </div>

          {state?.errors?._form && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{state.errors._form}</span>
            </div>
          )}

          <div className="flex w-full gap-8">
            <button
              type="button"
              onClick={() => router.push(`/${lng}/event-promoter/events`)}
              className="w-full rounded-lg border border-primary bg-[#f4f4f4] px-6 py-2 text-primary"
            >
              {t("cancel")}
            </button>
            <button type="submit" className="w-full rounded-lg bg-primary px-6 py-2 text-white">
              {t("updateEvent")}
            </button>
          </div>
        </form>
      </WrapperContent>

      <AddTicketModal tickets={tickets} setTickets={setTickets} />
    </>
  );
}
