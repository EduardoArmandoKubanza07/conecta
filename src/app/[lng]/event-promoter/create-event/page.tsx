"use client";

import { createEvent } from "@/actions/event";
import { useTranslation } from "@/app/i18n/client";
import AddTicketModal from "@/components/modals/AddTicketModal";
import { WrapperContent } from "@/containers/WrapperContent";
import { eventCategories } from "@/lib/data/event_categories";
import { LngPageProps } from "@/types/lng_page_props";
import { Ticket } from "@/types/events";
import Image from "next/image";
import { Editor } from "primereact/editor";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function Page({ params: { lng } }: LngPageProps) {
  const { t } = useTranslation(lng, "create-event-form");
  const [state, action] = useFormState(createEvent, undefined);
  const { pending } = useFormStatus();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [eventDescription, setEventDescription] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [coverImage, setCoverImage] = useState<any | undefined>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  function handleRemoveGalleryImage(index: number) {
    const leftPart = galleryImages.slice(0, index);
    const rightPart = galleryImages.slice(index + 1, galleryImages.length + 1);

    setGalleryImages([...leftPart, ...rightPart]);
  }

  return (
    <>
      <WrapperContent>
        <form action={action} className="m-auto flex flex-col gap-4">
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
                  placeholder={t("eventNamePlaceholder")}
                  className="input-style"
                />
                {state?.errors?.name && <p className="form-error-label">{state.errors.name}</p>}
              </div>

              <div className="flex w-full flex-col gap-2">
                <label htmlFor="event-date" className="text-base">
                  {t("eventDate")}
                </label>
                <input className="input-style" type="date" id="event-date" name="date" />
                {state?.errors?.date && <p className="form-error-label">{state.errors.date}</p>}
              </div>

              <div className="flex w-full flex-col gap-2">
                <label htmlFor="event-time" className="text-base">
                  {t("eventTime")}
                </label>
                <input type="time" className="input-style" id="event-time" name="time" />
                {state?.errors?.time && <p className="form-error-label">{state.errors.time}</p>}
              </div>
            </div>
          </div>

          <div className="form-layout">
            <h2 className="text-3xl font-bold text-primary mb-4"> {t("coverImage")} </h2>
            <p className="text-base mb-4">{t("coverImageDetails")}</p>

            <div className="flex gap-4">
              <div className="relative flex flex-col w-full gap-2">
                <label
                  htmlFor="cover-image"
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-6 py-4 text-white"
                >
                  {t("addImage")}
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
                {state?.errors?.coverImage && <p className="form-error-label">{state.errors.coverImage}</p>}

                {coverImage && (
                  <Image
                    src={URL.createObjectURL(coverImage)}
                    alt="Something"
                    className="w-full"
                    width={100}
                    height={100}
                  />
                )}
              </div>

              <div className="relative flex flex-col w-full gap-2">
                <label
                  htmlFor="gallery-image"
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-primary bg-[#f4f4f4] px-6 py-4 text-primary"
                >
                  {t("selectFromGallery")}
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
                {state?.errors?.additionalImages && <p className="form-error-label">{state.errors.additionalImages}</p>}

                {galleryImages.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {galleryImages.map((iimg, _idx) => (
                      <li className="flex relative" key={_idx}>
                        <button onClick={() => handleRemoveGalleryImage(_idx)} className="absolute top-0 right-0">
                          x
                        </button>
                        <Image src={URL.createObjectURL(iimg)} alt="Something" width={100} height={100} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="form-layout">
            <h2 className="text-3xl font-bold text-primary mb-4">{t("eventLocation")}</h2>

            <div className="flex flex-col gap-4">
              <label htmlFor="event-location " className="text-base">
                {t("eventLocationInfo")}
              </label>
              <input
                type="text"
                id="event-location"
                name="location"
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
              <select title={t("eventCategoryPlaceholder")} className="input-style" name="category" id="event-category">
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
                placeholder={t("organizerEntityPlaceholder")}
              />
              {state?.errors?.entity && <p className="form-error-label">{state.errors.entity}</p>}
            </div>
          </div>

          <div className="form-layout">
            <h2 className="text-3xl font-bold text-primary">{t("tickets")}</h2>
            {tickets.length > 0 && (
              <div className="mt-2 border rounded-lg p-4 space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">{ticket.name}</p>
                      <p className="text-sm text-gray-500">
                        {ticket.price.toFixed(2)} AOA - {ticket.quantity} unidades
                      </p>
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
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={() => document.getElementById("add-ticket-modal")?.classList.remove("hidden")}
            >
              <span className="mr-2">+</span>Adicionar Tickets
            </button>
          </div>
          <div className="flex w-full gap-8">
            <button
              type="button"
              className="w-full rounded-lg border border-primary bg-[#f4f4f4] px-6 py-2 text-primary"
            >
              {t("cancel")}
            </button>
            <button type="submit" disabled={pending} className="w-full rounded-lg bg-primary px-6 py-2 text-white">
              {t("publishEvent")}
            </button>
          </div>
        </form>
      </WrapperContent>

      <AddTicketModal tickets={tickets} setTickets={setTickets} />
    </>
  );
}
