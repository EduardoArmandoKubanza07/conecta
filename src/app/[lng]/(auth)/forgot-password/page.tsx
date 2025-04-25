"use client";

import { sendRecoverPasswordCode } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { email } from "@/images";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";

export default function Page() {
  const [state, action] = useFormState(sendRecoverPasswordCode, undefined);
  const { pending } = useFormStatus();

  return (
    <section className="sign-layout">
      <div className="flex w-96 max-w-sm flex-col items-center gap-8 rounded-lg bg-white p-8 shadow-lg shadow-black/20">
        <h2 className="text-black font-bold uppercase text-2xl"> ConectaEventos </h2>

        <form action={action} className="flex w-full flex-col gap-8">
          <div className="form-control">
            <label className="form-label" htmlFor="email">
              Email da conta a recuperar
            </label>
            <div className="form-input">
              <Image src={email} alt={""} />
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="**********"
                className="border-0 bg-transparent"
              />
            </div>
            {state?.errors?.email && <p className="text-destructive text-xs">{state.errors.email}</p>}
          </div>

          <Button type="submit" disabled={pending}>
            Enviar
          </Button>
        </form>
      </div>
    </section>
  );
}
