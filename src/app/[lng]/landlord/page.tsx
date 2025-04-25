"use client";
import AuthHeader from "@/components/authHeader";
import Footer from "@/components/footer";
import CreateSpaceModal from "@/components/modals/CreateSpaceModal";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AuthHeader />
      <button onClick={() => setIsOpen(true)}> Criar Espaço </button>
      <CreateSpaceModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Footer />
    </>
  );
}
