import React from "react";

export default function HomeCard({ imageSrc, title }) {
  return (
    <div
      className="bg-white text-gray-900 rounded-3xl flex flex-col items-center justify-center text-center
      text-base w-[240px] h-[240px] transition-transform duration-300 hover:-translate-y-2.5 shadow-lg p-4"
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-16 h-16 object-contain mb-6"
      />
      <p className="text-base font-medium">{title}</p>
    </div>
  );
}
