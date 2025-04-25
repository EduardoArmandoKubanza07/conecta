"use client";

import { useEffect, useState } from "react";
import { FaCalendar, FaMapPin, FaMinus, FaPlus, FaTicketAlt } from "react-icons/fa";
import { useTicketsStore } from "@/stores/tickets_store";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Link from "next/link";
import { Ticket } from "@/types/events";

// Form schema for participant information
const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(9, { message: "Phone number must be at least 9 digits." }),
});

export default function Payment() {
  const params = useParams();
  const { eventId } = params;
  const router = useRouter();
  const { tickets, increaseTicketQty, decreaseTicketQty, setTickets } = useTicketsStore();
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState({
    name: "Tech Conference 2024",
    startDate: "25 out - 2024 • 14:00",
    endDate: "27 out - 2024 • 20:00",
    location: "Luanda, Vila de viana/Casa da Juventude",
    price: 50.0,
    salesEndDate: "30/12/2024",
  });

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Retrieve event data from localStorage
        const storedEventData = localStorage.getItem("eventData");
        const storedTickets = localStorage.getItem("selectedTickets");

        if (!storedEventData || !storedTickets) {
          // If no data found, redirect back to event detail page
          toast.error("No ticket information found. Please select tickets first.");
          router.push(`/${params.lng}/events/${eventId}`);
          return;
        }

        const eventData = JSON.parse(storedEventData);
        const selectedTickets = JSON.parse(storedTickets);

        // Set the event data
        setEventData({
          name: eventData.name,
          startDate: formatEventDate(eventData.date),
          endDate: formatEventTime(eventData.date), // This should be end time if available
          location: eventData.location,
          price: selectedTickets.reduce((total: number, ticket: Ticket) => total + ticket.price * ticket.quantity, 0),
          salesEndDate: "30/12/2024", // This should come from actual event data if available
        });

        // Initialize tickets from localStorage
        setTickets(selectedTickets);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading event data:", error);
        toast.error("Failed to load ticket information. Please try again.");
        router.push(`/${params.lng}/events/${eventId}`);
      }
    };

    fetchEventData();
  }, [eventId, setTickets, router, params.lng]);

  const calculateSubtotal = () => {
    return tickets.reduce((total, ticket) => total + ticket.price * ticket.quantity, 0);
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // You could add taxes or fees here
    return subtotal;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create payload with form data and tickets
      const payload = {
        eventId,
        tickets,
        participant: values,
        total: calculateTotal(),
      };

      console.log("Purchase payload:", payload);

      // TODO: submit this to API
      // await fetch('/api/purchase', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });

      toast.success("Purchase successful! Your tickets have been confirmed.");

      // Redirect to confirmation page
      router.push(`/${params.lng}/events/${eventId}/confirmation`);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Event details section */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-primary mb-6">{eventData.name}</h1>

            <div className="space-y-4">
              <p className="flex items-center gap-3 text-lg">
                <FaCalendar className="text-primary" />
                <span>
                  {eventData.startDate} &gt; {eventData.endDate}
                </span>
              </p>
              <p className="flex items-center gap-3 text-lg">
                <FaMapPin className="text-primary" />
                <span>{eventData.location}</span>
              </p>
            </div>
          </div>

          {/* Participant information form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Participant Information</h2>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="John Doe" {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="john@example.com" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input placeholder="+1 (123) 456-7890" {...form.register("phone")} />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                )}
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                      Processing...
                    </span>
                  ) : (
                    "Complete Purchase"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Order summary section */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl shadow-md sticky top-20">
            <div className="bg-primary text-white p-4 rounded-t-xl">
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>

            <div className="p-4 space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-semibold">{ticket.name}</p>
                      <p className="text-primary font-medium">{ticket.price.toFixed(2)} AOA</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => decreaseTicketQty(ticket.id)}
                        disabled={ticket.quantity <= 1}
                      >
                        <FaMinus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center">{ticket.quantity}</span>

                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => increaseTicketQty(ticket.id)}
                        disabled={ticket.quantity >= 10}
                      >
                        <FaPlus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">Sales end on {eventData.salesEndDate}</p>
                </div>
              ))}

              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{calculateSubtotal().toFixed(2)} AOA</span>
                </div>

                <hr className="my-2 border-gray-200" />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{calculateTotal().toFixed(2)} AOA</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <FaTicketAlt />
                  <span>Tickets will be sent to your email</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link href={`/${params.lng}/events/${eventId}`} className="text-primary hover:underline text-sm">
              Return to event details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
