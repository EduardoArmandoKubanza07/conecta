"use client";

import { useEffect, useState } from "react";
import useGetEvents from "@/hooks/useGetEvents";
import { Event } from "@/lib/models/Event";
import { Button } from "@/components/ui/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FaCalendarAlt, FaClock, FaEdit, FaMapMarkerAlt, FaPlus, FaTrash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/loadingSpinner";

export default function PromoterEventsPage() {
  const router = useRouter();
  const params = useParams();
  const { lng } = params;
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const { getEvents } = useGetEvents();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      // Assume this endpoint returns only events created by the logged-in promoter
      const response = await getEvents<{ events: Event[] }>();
      setEvents(response.events || []);
      console.log("Events fetched:", events);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load your events. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = () => {
    router.push(`/${lng}/event-promoter/create-event`);
  };

  const handleEditEvent = (event: Event) => {
    router.push(`/${lng}/event-promoter/events/${event.id}/edit`);
  };

  const handleViewEvent = (event: Event) => {
    router.push(`/${lng}/events/${event.id}`);
  };

  const handleDeleteEvent = (event: Event) => {
    setSelectedEvent(event);
    setDeleteConfirmVisible(true);
  };

  const confirmDelete = async () => {
    if (!selectedEvent) return;

    setIsLoading(true);
    try {
      // Implement actual delete API call here
      // await deleteEvent(selectedEvent.id);
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event. Please try again.");
    } finally {
      setDeleteConfirmVisible(false);
      setIsLoading(false);
    }
  };

  const viewDetails = (event: Event) => {
    setSelectedEvent(event);
    setSidebarVisible(true);
  };

  // Format date nicely
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time nicely
  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const actionBodyTemplate = (rowData: Event) => {
    return (
      <div className="flex gap-2 justify-center">
        <Button variant="outline" size="sm" className="p-2" onClick={() => viewDetails(rowData)}>
          <FaEye className="text-primary" />
        </Button>
        <Button variant="outline" size="sm" className="p-2" onClick={() => handleViewEvent(rowData)}>
          <FaEye className="text-blue-500" />
        </Button>
        <Button variant="outline" size="sm" className="p-2" onClick={() => handleEditEvent(rowData)}>
          <FaEdit className="text-amber-500" />
        </Button>
        <Button variant="outline" size="sm" className="p-2" onClick={() => handleDeleteEvent(rowData)}>
          <FaTrash className="text-red-500" />
        </Button>
      </div>
    );
  };

  const statusBodyTemplate = (rowData: Event) => {
    const now = new Date();
    const eventDate = new Date(rowData.date);

    if (eventDate < now) {
      return <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs">Completed</span>;
    } else {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Upcoming</span>;
    }
  };

  const ticketsBodyTemplate = (rowData: Event) => {
    if (!rowData.tickets || rowData.tickets.length === 0) {
      return <span className="text-gray-500">No tickets</span>;
    }

    const totalTickets = rowData.tickets.reduce((sum, ticket) => sum + (ticket.quantity || 0), 0);
    const soldTickets = rowData.tickets.reduce((sum, ticket) => sum + (ticket.sold || 0), 0);

    return (
      <div className="text-center">
        <span className="font-semibold">{soldTickets}</span> / {totalTickets}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-primary">My Events</h1>

        <Button onClick={handleCreateEvent} className="flex items-center gap-2">
          <FaPlus /> Create New Event
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <LoadingSpinner />
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">No Events Yet</h2>
          <p className="text-gray-500 mb-8">
            You haven`&apos;`t created any events yet. Start by creating your first event!
          </p>
          <Button onClick={handleCreateEvent} className="flex items-center gap-2 mx-auto">
            <FaPlus /> Create Your First Event
          </Button>
        </div>
      ) : (
        <div className="rounded-xl shadow-md overflow-hidden">
          <DataTable
            value={events}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            emptyMessage="No events found"
            stripedRows
            removableSort
            sortMode="multiple"
            className="p-datatable-sm p-8"
          >
            <Column field="name" header="Event Name" sortable style={{ width: "25%" }} />
            <Column field="category" header="Category" sortable style={{ width: "15%" }} />
            <Column
              field="date"
              header="Date"
              sortable
              style={{ width: "15%" }}
              body={(rowData) => formatEventDate(rowData.date)}
            />
            <Column field="status" header="Status" style={{ width: "10%" }} body={statusBodyTemplate} sortable />
            <Column field="tickets" header="Tickets (Sold/Total)" style={{ width: "15%" }} body={ticketsBodyTemplate} />
            <Column body={actionBodyTemplate} header="Actions" style={{ width: "20%" }} />
          </DataTable>
        </div>
      )}

      {/* Event Details Sidebar */}
      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        position="right"
        className="w-full md:w-[30rem] bg-white"
        style={{ maxWidth: "90vw" }}
      >
        {selectedEvent && (
          <div className="p-4">
            <h2 className="text-2xl font-bold text-primary mb-4">{selectedEvent.name}</h2>

            <div className="mb-6 relative rounded-lg overflow-hidden h-48">
              <Image src={selectedEvent.coverUrl} alt={selectedEvent.name} fill className="object-cover" />
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                <span>{formatEventDate(selectedEvent.date)}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="text-primary" />
                <span>{formatEventTime(selectedEvent.date)}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                <span>{selectedEvent.location}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{selectedEvent.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Tickets</h3>
              <div className="space-y-2">
                {selectedEvent.tickets
                  ? selectedEvent.tickets.map((ticket) => (
                      <div key={ticket.id} className="border-b pb-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{ticket.name}</span>
                          <span className="text-primary font-medium">{ticket.price} AOA</span>
                        </div>
                        <p className="text-sm text-gray-500">{ticket.description}</p>
                        <div className="flex justify-between text-sm">
                          <span>Sold: {ticket.sold || 0}</span>
                          <span>Available: {(ticket.quantity || 0) - (ticket.sold || 0)}</span>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="default" className="flex-1" onClick={() => handleEditEvent(selectedEvent)}>
                <FaEdit className="mr-2" /> Edit Event
              </Button>
              <Button variant="default" className="flex-1" onClick={() => handleViewEvent(selectedEvent)}>
                <FaEye className="mr-2" /> Public View
              </Button>
            </div>
          </div>
        )}
      </Sidebar>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmVisible && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Delete Event</h3>
            <p className="mb-6">
              Are you sure you want to delete <span className="font-semibold">{selectedEvent.name}</span>? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirmVisible(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
