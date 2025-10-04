import React from "react";

export default function PaperCard({
  title,
  journal,
  description,
  isChecked,
  onToggle,
}) {
  return (
    <div className="flex items-start gap-6 mb-4">
      {/* 사용자 논문 체크 */}
      <button
        onClick={onToggle}
        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 
          transition-colors duration-300
          ${isChecked ? "bg-[#F8F8F8]" : "bg-[#8E8E8E] hover:bg-[#A0A0A0]"}
        `}
      >
        <svg
          className={`w-6 h-6 text-gray-900 transition-transform duration-300 
            ${isChecked ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>

      {/* 논문 내용 (왼쪽 영역) */}
      <div className="bg-[#E8E8E8] rounded-lg p-4 flex-1">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-xs text-gray-700 mb-2">{journal}</p>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </div>
  );
}
