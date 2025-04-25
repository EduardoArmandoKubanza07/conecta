"use client";
import AuthHeader from "@/components/authHeader";
import Footer from "@/components/footer";
import CreateServiceModal from "@/components/modals/CreateServiceModal";
import ServiceCard from "@/components/ServiceCard";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const services = [
    {
      id: 1,
      title: "Home Deep Cleaning",
      description: "Comprehensive cleaning for entire home",
      price: 89.99,
      coverImageUrl:
        "https://images.pexels.com/photos/30056395/pexels-photo-30056395/free-photo-of-cafe-da-manha-luxuoso-na-cama-com-croissants-e-velas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "3 hours",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Electrical System Repair",
      description: "Professional electrical diagnostics",
      price: 120.0,
      coverImageUrl:
        "https://images.pexels.com/photos/30056395/pexels-photo-30056395/free-photo-of-cafe-da-manha-luxuoso-na-cama-com-croissants-e-velas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "2 hours",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Plumbing Maintenance",
      description: "Full plumbing inspection and repair",
      price: 95.5,
      coverImageUrl:
        "https://images.pexels.com/photos/30056395/pexels-photo-30056395/free-photo-of-cafe-da-manha-luxuoso-na-cama-com-croissants-e-velas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "1.5 hours",
      rating: 4.9,
    },
    {
      id: 1,
      title: "Home Deep Cleaning",
      description: "Comprehensive cleaning for entire home",
      price: 89.99,
      coverImageUrl:
        "https://images.pexels.com/photos/30056395/pexels-photo-30056395/free-photo-of-cafe-da-manha-luxuoso-na-cama-com-croissants-e-velas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "3 hours",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Electrical System Repair",
      description: "Professional electrical diagnostics",
      price: 120.0,
      coverImageUrl:
        "https://images.pexels.com/photos/30056395/pexels-photo-30056395/free-photo-of-cafe-da-manha-luxuoso-na-cama-com-croissants-e-velas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "2 hours",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Plumbing Maintenance",
      description: "Full plumbing inspection and repair",
      price: 95.5,
      coverImageUrl:
        "https://images.pexels.com/photos/30056395/pexels-photo-30056395/free-photo-of-cafe-da-manha-luxuoso-na-cama-com-croissants-e-velas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "1.5 hours",
      rating: 4.9,
    },
    {
      id: 1,
      title: "Home Deep Cleaning",
      description: "Comprehensive cleaning for entire home",
      price: 89.99,
      coverImageUrl:
        "https://images.pexels.com/photos/30056395/pexels-photo-30056395/free-photo-of-cafe-da-manha-luxuoso-na-cama-com-croissants-e-velas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "3 hours",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Electrical System Repair",
      description: "Professional electrical diagnostics",
      price: 120.0,
      coverImageUrl:
        "https://images.pexels.com/photos/30056395/pexels-photo-30056395/free-photo-of-cafe-da-manha-luxuoso-na-cama-com-croissants-e-velas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "2 hours",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Plumbing Maintenance",
      description: "Full plumbing inspection and repair",
      price: 95.5,
      coverImageUrl:
        "https://images.pexels.com/photos/30056395/pexels-photo-30056395/free-photo-of-cafe-da-manha-luxuoso-na-cama-com-croissants-e-velas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      duration: "1.5 hours",
      rating: 4.9,
    },
  ];
  return (
    <>
      <AuthHeader />
      <button onClick={() => setIsOpen(true)}> Criar Serviço </button>
      <CreateServiceModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="container mx-auto px-4 flex flex-wrap justify-center gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>

      <Footer />
    </>
  );
}
