import { buildUrl } from "@/helpers/buildUrl";
import {
  ForgotPasswordFormState,
  ForgotPasswordSchema,
  ResetPasswordFormState,
  ResetPasswordSchema,
  SignInFormSchema,
  SignupFormSchema,
  SignUpFormState,
} from "@/lib/definitions/auth";
import { toast } from "react-toastify";
// import { createSession } from "@/lib/sessions";
// import { permanentRedirect } from "next/navigation";

const USER_ROLES = {
  ADMIN: "admin",
  EVENTPROMOTER: "event-promoter",
  LANDLORD: "landlord",
  SERVICEPROVIDER: "service-provider",
  USER: "user",
};

export async function signup(state: SignUpFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    gender: formData.get("gender"),
    role: formData.get("role"),
    password: formData.get("password"),
    phoneNumber: formData.get("phoneNumber"),
    countryCode: formData.get("countryCode"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data } = validatedFields;

  const url = await buildUrl("users");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name,
      gender: data.gender,
      role: data.role,
      phoneNumber: {
        countryCode: data.countryCode,
        number: data.phoneNumber,
      },
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    console.error(data.message);
    toast.error(data.message);
    return;
  }

  toast.success("A sua conta foi criada com sucesso, agora inicie sessão");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  window.location.href = "/sign/in";
}

export async function signin(state: SignUpFormState, formData: FormData) {
  try {
    // Validate form fields
    const validatedFields = SignInFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const fields = validatedFields.data;

    const url = await buildUrl("login");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: fields.email, password: fields.password }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error(data.message);
      toast.error(data.message);
    }

    const data = await response.json();

    if (data.token) {
      const role = data.user.role;

      // await createSession(data.token);

      window.sessionStorage.setItem("session", data.token);
      window.sessionStorage.setItem("cur-user", JSON.stringify(data.user));

      document.cookie = "token=" + data.token + " path=/";

      if (role === USER_ROLES.USER) {
        window.location.href = "/";
        return;
      }

      if (role === USER_ROLES.ADMIN) {
        window.location.href = "/".concat("-/admin");
        return;
      }

      if (role === USER_ROLES.EVENTPROMOTER) {
        window.location.href = window.location.origin.concat("/".concat("/event-promoter"));
        return;
      }

      window.location.href = "/".concat(role);
    } else {
      console.error("Invalid credentials");
    }
  } catch (err) {
    console.error("Algo correu mal durante o login, tente novamente", err);
  }
}

export async function sendRecoverPasswordCode(state: ForgotPasswordFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
}

export async function resetPassword(state: ResetPasswordFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = ResetPasswordSchema.safeParse({
    newPassword: formData.get("password"),
    confirmPassword: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...
}

export async function validateEmail(token: string, email: string) {
  const url = await buildUrl("validate-email");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, validateEmailToken: token }),
  });

  if (response.ok) {
    toast.success("Email Validado com sucesso - Já pode iniciar sessão");

    setTimeout(() => {
      window.location.href = "/sign/in";
    }, 2000);
  }
}
