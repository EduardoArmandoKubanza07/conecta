"use client";

import { resetPassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { block } from "@/images";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";

export default function Page() {
  const [state, action] = useFormState(resetPassword, undefined);
  const { pending } = useFormStatus();

  return (
    <section className="sign-layout">
      <div className="flex w-96 max-w-sm flex-col items-center gap-8 rounded-lg bg-white p-8 shadow-lg shadow-black/20">
        <h2 className="text-black font-bold uppercase text-2xl"> ConectaEventos </h2>

        <form action={action} className="flex w-full flex-col gap-8">
          <div className="form-control">
            <label className="form-label" htmlFor="newPassword">
              Nova palavra-passe
            </label>
            <div className="form-input">
              <Image src={block} alt={""} />
              <Input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="**********"
                className="border-0 bg-transparent"
              />
            </div>
            {state?.errors?.newPassword && <p className="text-destructive text-xs">{state.errors.newPassword}</p>}
          </div>

          <div className="form-control">
            <label className="form-label" htmlFor="confirmPassword">
              Confirmar nova palavra-passe
            </label>
            <div className="form-input">
              <Image src={block} alt={""} />
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="**********"
                className="border-0 bg-transparent"
              />
            </div>
            {state?.errors?.confirmPassword && (
              <p className="text-destructive text-xs">{state.errors.confirmPassword}</p>
            )}
          </div>

          <Button type="submit" disabled={pending}>
            Redefinir
          </Button>
        </form>
      </div>
    </section>
  );
}
