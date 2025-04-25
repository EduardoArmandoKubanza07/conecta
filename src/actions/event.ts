import { buildUrl } from "@/helpers/buildUrl";
import { CreateEventFormSchema, CreateEventFormState } from "@/lib/definitions/event";

export async function createEvent(state: CreateEventFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = CreateEventFormSchema.safeParse({
    name: formData.get("name"),
    date: formData.get("date"),
    time: formData.get("time"),
    coverImage: formData.get("coverImage"),
    additionalImages: formData.getAll("additionalImages"),
    location: formData.get("location"),
    category: formData.get("category"),
    description: formData.get("description"),
    tickets: JSON.parse(formData.get("tickets") as string),
    entity: formData.get("entity"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log("Creating event with the following data:", validatedFields.data);

  const url = await buildUrl("events");
  const result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(validatedFields.data),
    credentials: "include",
    headers: {
      ContentType: "multipart/form-data",
    },
  });

  if (result.ok) {
    alert("Event created successfully!");
    window.location.href = "/event-promoter";
    return;
  }

  alert("Error ao criar evento");
  console.log("Error creating event:", result.body);
}

interface FormState {
  success?: boolean;
  errors?: {
    _form?: string;
    name?: string;
    date?: string;
    time?: string;
    location?: string;
    description?: string;
    category?: string;
    entity?: string;
    tickets?: string;
  };
}

export const updateEvent = async (state: FormState | undefined, formData: FormData): Promise<FormState> => {
  const eventId = formData.get("eventId") as string;
  const existingImages = formData.get("existingImages") as string;
  const name = formData.get("name") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const entity = formData.get("entity") as string;
  const tickets = formData.get("tickets") as string;

  try {
    const coverImage = formData.get("coverImage");
    const additionalImages = formData.getAll("additionalImages");

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("date", date);
    formDataToSend.append("time", time);
    formDataToSend.append("location", location);
    formDataToSend.append("description", description);
    formDataToSend.append("category", category);
    formDataToSend.append("entity", entity);
    formDataToSend.append("tickets", tickets);
    formDataToSend.append("existingImages", existingImages);

    if (coverImage instanceof File) {
      formDataToSend.append("coverImage", coverImage);
    }

    if (additionalImages && additionalImages.length > 0) {
      additionalImages.forEach((image) => {
        if (image instanceof File) {
          formDataToSend.append("additionalImages", image);
        }
      });
    }

    const url = await buildUrl(`/events/${eventId}`);
    const response = await fetch(url, {
      method: "PUT",
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update event:", errorData);
      return {
        success: false,
        errors: {
          _form: errorData.message || "Failed to update event. Please try again.",
        },
      };
    }

    return { success: true, errors: {} };
  } catch (error) {
    console.error("Failed to update event:", error);
    return {
      success: false,
      errors: {
        _form: (error as Error).message || "Failed to update event. Please try again.",
      },
    };
  }
};
