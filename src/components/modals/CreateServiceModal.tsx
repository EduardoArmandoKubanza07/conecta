import React, { useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const CreateServiceModal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const handleCloseModal = () => setIsOpen(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos([...photos, ...Array.from(e.target.files)]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideos([...videos, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, category, description, price, photos, videos });
    handleCloseModal();
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-lg z-50 overflow-y-auto 
      transition-transform duration-300 ease-in-out transform translate-x-0 
      data-[state=closed]:translate-x-full"
        >
          <div className="p-8 relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
              <FaTimes className="text-2xl" />
            </button>

            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Criar Novo Serviço</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Nome do Serviço"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione uma Categoria</option>
                <option value="limpeza">Limpeza</option>
                <option value="manutencao">Manutenção</option>
                <option value="consultoria">Consultoria</option>
              </select>

              <textarea
                placeholder="Descrição do Serviço"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="number"
                placeholder="Preço"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <div>
                <label className="block mb-2 text-gray-700">Fotos</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center p-5 bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 transition">
                    <FaCloudUploadAlt className="text-4xl text-primary" />
                    <span className="text-gray-600">Carregar Fotos</span>
                    <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                </div>
                <div className="flex space-x-2 mt-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="w-20 h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Vídeos</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center p-5 bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 transition">
                    <FaCloudUploadAlt className="text-4xl text-primary" />
                    <span className="text-gray-600">Carregar Vídeos</span>
                    <input type="file" multiple accept="video/*" onChange={handleVideoUpload} className="hidden" />
                  </label>
                </div>
                <div className="flex space-x-2 mt-2">
                  {videos.map((video, index) => (
                    <div key={index} className="w-20 h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Criar Serviço
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateServiceModal;
