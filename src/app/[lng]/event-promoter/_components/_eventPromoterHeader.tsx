"use client";

import FloatPanel from "@/components/headerFloatPanel";
import { WrapperContent } from "@/containers/WrapperContent";
import { jonhdoe } from "@/images";
import { useAuthStore } from "@/stores/auth_store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function EventPromoterHeader() {
  const { userData } = useAuthStore();
  const [floatPanelOpened, setFloatPanelOpened] = useState(false);

  const handleOpenFloatPanel = () => {
    setFloatPanelOpened(!floatPanelOpened);
  };

  return (
    <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 flex h-20 items-center justify-between px-16 py-4 shadow-2xl">
      <WrapperContent>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            <Link href="/"> ConectaEventos </Link>
          </h2>

          <div className="flex gap-4 items-center m-4">
            <div className="flex items-center gap-2">
              <Link href="/account/profile" className="flex items-center justify-normal gap-2">
                <Image src={jonhdoe} height={32} width={32} className="rounded-full" alt="User profile Thumbnail" />
                <strong className="text-base font-medium"> {userData.name && userData.name.firstName} </strong>
              </Link>
            </div>

            <button onClick={handleOpenFloatPanel}>
              <FaChevronDown />
            </button>
          </div>
        </div>

        <FloatPanel opened={floatPanelOpened} />
      </WrapperContent>
    </header>
  );
}
