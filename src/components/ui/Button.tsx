"use client";

interface Props {
  children: React.ReactNode;
}

export default function Button({ children }: Props) {
  return (
    <button
      className="
      px-8
      py-4
      rounded-full
      bg-cyan-500
      text-black
      font-bold
      transition-all
      duration-300
      hover:scale-105
      hover:bg-cyan-400
      hover:shadow-[0_0_30px_#22d3ee]
      "
    >
      {children}
    </button>
  );
}