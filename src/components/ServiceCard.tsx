import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  coverImageUrl: string;
  duration: string;
  rating: number;
}

export default function ServiceCard(service: Service) {
  return (
    <div
      key={service.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl w-96"
    >
      <div className="relative">
        <div>
          <Image alt="Service Image" className="w-full h-48 object-cover" fill src={service.coverImageUrl} />
        </div>
        <div className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded-full flex items-center">
          <FaStar className="text-yellow-500 mr-1" />
          <span className="text-sm font-semibold">{service.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
        <div className="flex justify-between items-center mt-3">
          <div className="text-green-600 font-bold">${service.price.toFixed(2)}</div>
          <div className="text-gray-500 text-sm">{service.duration}</div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
}
