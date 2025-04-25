import { UpdateProfileFormState, UpdateProfileFormSchema } from "@/lib/definitions/account";

export async function updateProfile(state: UpdateProfileFormState, formData: FormData) {
  const validatedFields = UpdateProfileFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
}
