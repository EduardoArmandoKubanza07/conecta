import React, { useState } from "react";
import { FaImage, FaVideo, FaTimes } from "react-icons/fa";
import { ModalProps } from "./CreateServiceModal";

const CreateSpaceModal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const [spaceName, setSpaceName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      spaceName,
      description,
      category,
      location,
      address,
      price,
      photos,
      video,
    });
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <FaTimes size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">Criar Novo Espaço</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Nome do Espaço</label>
                <input
                  type="text"
                  value={spaceName}
                  onChange={(e) => setSpaceName(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Descrição</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded p-2 h-24"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border rounded p-2"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="escritorio">Escritório</option>
                    <option value="sala-reuniao">Sala de Reunião</option>
                    <option value="evento">Espaço para Evento</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Localidade</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Endereço</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Preço para Alocação</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div>
                <label className="mb-2 flex items-center">
                  <FaImage className="mr-2" /> Fotografias
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setPhotos(Array.from(e.target.files || []))}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center">
                  <FaVideo className="mr-2" /> Vídeo do Espaço
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files?.[0] || null)}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="flex justify-center space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary">
                  Criar Espaço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSpaceModal;
