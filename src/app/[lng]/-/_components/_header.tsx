"use client";

import { WrapperContent } from "@/containers/WrapperContent";
import { useAuthStore } from "@/stores/auth_store";
import Image from "next/image";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";

export default function AdminHeader() {
  const { userData } = useAuthStore();
  return (
    <header className="sticky top-0 left-0 w-full">
      <WrapperContent>
        <div className="w-full flex justify-between">
          <div className="flex items-center w-6/12 h-10 px-5 bg-gray-100 border rounded-lg">
            <input
              type="search"
              placeholder="Pesquisar eventos..."
              className=" text-sm text-gray-800  outline-none w-full bg-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <Link href="#" className="flex items-center justify-normal gap-2">
              <Image
                src={"/"}
                height={32}
                width={32}
                className="rounded-full object-cover h-8 w-8 bg-primary"
                alt="User profile Thumbnail"
              />
              <strong className="text-base font-medium"> {userData.name && userData.name.firstName} </strong>
            </Link>

            <button>
              <FaAngleDown />
            </button>
          </div>
        </div>
      </WrapperContent>
    </header>
  );
}
