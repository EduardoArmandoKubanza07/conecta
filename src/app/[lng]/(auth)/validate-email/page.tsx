"use client";

import { Suspense } from "react";
import { ValidateEmail } from "./validate";

export default function Page() {
  return (
    <Suspense>
      <ValidateEmail />
    </Suspense>
  );
}
