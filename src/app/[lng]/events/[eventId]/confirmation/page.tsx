"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaCheckCircle, FaTicketAlt, FaDownload, FaEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import confetti from "canvas-confetti";

export default function ConfirmationPage() {
  const params = useParams();
  const { lng } = params;

  useEffect(() => {
    // Launch confetti when the page loads
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />

        <h1 className="text-2xl font-bold mb-4">Purchase Successful!</h1>

        <p className="text-gray-600 mb-8">Your tickets have been confirmed and sent to your email address.</p>

        <div className="flex flex-col gap-4 mb-8">
          <Button className="flex items-center justify-center gap-2">
            <FaDownload /> Download Tickets
          </Button>

          <Button variant="outline" className="flex items-center justify-center gap-2">
            <FaEnvelope /> Resend to Email
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-primary">
          <FaTicketAlt />
          <span className="font-medium">Order #12345</span>
        </div>

        <div className="mt-8">
          <Link href={`/${lng}/events`} className="text-primary hover:underline">
            Browse more events
          </Link>
        </div>
      </div>
    </div>
  );
}
