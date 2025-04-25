"use client";

import { validateEmail } from "@/actions/auth";
import { useSearchParams } from "next/navigation";

export function ValidateEmail() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const email = params.get("email") || "";

  return (
    <div>
      <form
        action={async () => {
          await validateEmail(token, email);
        }}
      >
        <button type="submit">Validate Email</button>
      </form>
    </div>
  );
}
