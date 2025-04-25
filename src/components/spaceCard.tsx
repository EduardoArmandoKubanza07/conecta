"use client";

import Image from "next/image";

export default function SpaceCard({
  coverSrc,
  title,
  locality,
  description,
  onClickSee,
  onClickUnpublish,
}: {
  coverSrc: string;
  title: string;
  locality: string;
  description: string;
  onClickSee: () => void;
  onClickUnpublish: () => void;
}) {
  return (
    <li className="p-4 rounded-3xl bg-primary text-white max-w-sm w-full flex flex-col justify-between gap-4">
      <Image
        src={coverSrc}
        alt=""
        className="rounded-lg bg-white w-full object-cover h-full"
        width={350}
        height={195}
      />

      <div className="flex flex-col justify-between h-full gap-2">
        <p className="font-bold text-lg">{title}</p>
        <p className="font-bold text-base">{locality}</p>
        <p className="text-sm">{description}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onClickSee}
          className="px-4 py-2 text-primary bg-white rounded-lg w-44 border hover:border-white hover:bg-transparent hover:text-white transition-colors duration-300"
        >
          Ver
        </button>

        <button
          onClick={onClickUnpublish}
          className="px-4 py-2 text-primary bg-white rounded-lg w-44 border hover:border-white hover:bg-transparent hover:text-white transition-colors duration-300"
        >
          Despublicar
        </button>
      </div>
    </li>
  );
}
