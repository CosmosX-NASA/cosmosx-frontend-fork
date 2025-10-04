import React from "react";

export default function GapCard({ gap, isChecked, onToggle, categoryColor }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-4 relative">
      {/* 체크박스 */}
      <button
        onClick={onToggle}
        className={`absolute top-4 right-4 w-8 h-8 rounded flex items-center justify-center transition-all duration-300
          ${isChecked ? "bg-gray-700" : "bg-gray-400 hover:bg-gray-500"}
        `}
      >
        <svg
          className={`w-5 h-5 text-white transition-transform duration-300 
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

      {/* GAP 내용 */}
      <div className="pr-12">
        <h3 className="text-base font-bold text-gray-900 mb-3">{gap.title}</h3>

        <div className="mb-3">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-700">Content:</span>{" "}
            {gap.content}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 italic">
            <span className="font-semibold text-gray-700 not-italic">
              Evidence:
            </span>{" "}
            {gap.evidence}
          </p>
        </div>
      </div>
    </div>
  );
}
