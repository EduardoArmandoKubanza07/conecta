import { z } from "@/deps";

export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  countryCode: z.string().min(1, { message: "Country code is required" }).trim(),
  phoneNumber: z
    .string()
    .min(4, { message: "Phone number is required" })
    .max(15, "Phone number must have max 15 chars")
    .trim(),
  role: z.enum(["user", "event-promoter", "land-lord", "service-provider", "admin"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be utilizador, Promotor de Eventos, Arrendador, Provedor de Serviços ou Admin",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be male, female or other",
  }),
});

export const SignInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(8, { message: "Be at least 8 characters long" }).trim(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});

export const ResetPasswordSchema = z.object({
  newPassword: z.string().min(8, { message: "Be at least 8 characters long" }).trim(),
  confirmPassword: z.string().min(8, { message: "Be at least 8 characters long" }).trim(),
});

export type ResetPasswordFormState =
  | {
      errors?: {
        newPassword?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;

export type ForgotPasswordFormState =
  | {
      errors?: {
        email?: string[];
      };
      message?: string;
    }
  | undefined;

export type SignInFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SignUpFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
