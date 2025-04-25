import { z } from "@/deps";

export const UpdateProfileFormSchema = z.object({
  name: z
    .string({ message: "O nome deve ser uma string" })
    .min(5, { message: "O nome deve ter no mínimo 5 caracteres." })
    .trim(),
  phone: z.string({ message: "O telefone deve ser uma string" }).trim(),
  email: z.string().email({ message: "Por favor insira um email válido." }).trim(),
  gender: z.string().max(1).min(1).trim(),
  bornDate: z.string().date(),
  bio: z
    .string({ message: "A biografia deve ser um texto" })
    .min(50, { message: "A biografia deve ter no mínimo 50 caracteres" }),
});

export type UpdateProfileFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        gender?: string[];
        bornDate?: string[];
        bio?: string[];
      };
      message?: string;
    }
  | undefined;
