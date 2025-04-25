import { ReactNode } from "react";

export default function EventStatCard({
  title,
  children,
  number,
}: {
  title: string;
  children: ReactNode;
  number: number;
}) {
  return (
    <li className="bg-primary rounded-lg shadow-xl flex flex-col justify-between shadow-black/20 px-6 py-7 w-96 h-44 relative text-white">
      <p>{title}</p>
      <div className="flex items-end justify-end">
        <span className="bg-darkBlue rounded-full w-14 h-14 flex items-center justify-center">{children}</span>
      </div>
      <p className="text-5xl">{number}</p>
    </li>
  );
}
