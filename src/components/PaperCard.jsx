import React from 'react';

export default function PaperCard({
  title,
  description,
  isChecked,
  isViewed,
  onToggle,
  onView,
}) {
  return (
    <div className="flex items-start gap-6 mb-4">
      {/* 사용자 논문 체크 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 
          transition-colors duration-300
          ${isChecked ? 'bg-[#d2e4f0]' : 'bg-[#8E8E8E] hover:bg-[#869DAD]'}
        `}
      >
        <svg
          className={`w-6 h-6 text-gray-900 transition-transform duration-300 
            ${isChecked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
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
      <button
        onClick={onView}
        className={`rounded-lg p-4 flex-1 text-left transition-all duration-300
          ${isViewed ? 'bg-[#717171] ' : 'bg-[#FFFFFF] hover:bg-[#D8D8D8]'}
        `}
      >
        <h3
          className={`text-sm font-semibold mb-1 
          ${isViewed ? 'text-white' : 'text-gray-900'}
        `}
        >
          {title}
        </h3>
        <p
          className={`text-xs
          ${isViewed ? 'text-gray-300' : 'text-gray-600'}
        `}
        >
          {description}
        </p>
      </button>
    </div>
  );
}
