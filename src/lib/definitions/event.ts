import { z } from "@/deps";

export const CreateEventFormSchema = z.object({
  name: z.string().min(2, { message: "O nome do evento deve ter pelo menos 2 caracteres." }).trim(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "A data deve estar no formato YYYY-MM-DD.",
  }),
  time: z.string().regex(/^\d{2}:\d{2}$/, { message: "A hora deve estar no formato HH:MM." }),
  coverImage: z.instanceof(File, { message: "O arquivo deve ser um objeto do tipo File." }),
  additionalImages: z.array(z.instanceof(File, { message: "O arquivo deve ser um objeto do tipo File." })).optional(),
  category: z.string().min(3, { message: "A categoria deve ter no mínimo 3 caracteres" }).trim(),
  location: z.string().min(5, { message: "A localização deve ter pelo menos 5 caracteres." }).trim(),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres." }).trim(),
  tickets: z.array(
    z.object({
      name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
      price: z.number().min(0, { message: "O preço deve ser maior ou igual a 0." }),
      quantity: z.number().min(1, { message: "A quantidade deve ser pelo menos 1." }),
      description: z.string().optional(),
    }),
  ),
  entity: z
    .string()
    .min(2, {
      message: "O nome da entidade organizadora deve ter pelo menos 2 caracteres.",
    })
    .trim(),
});

export type CreateEventFormState =
  | {
      errors?: {
        name?: string[];
        date?: string[];
        time?: string[];
        coverImage?: string[];
        additionalImages?: string[];
        categoria?: string[];
        location?: string[];
        description?: string[];
        tickets?: string[];
        entity?: string[];
      };
      message?: string;
    }
  | undefined;
