import React from 'react';

export default function HelpModal({ isOpen, onClose, text }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 transition-opacity z-40"
        onClick={onClose}
      />

      {/* 도움말 모달 */}
      <div className="fixed bottom-24 left-8 bg-white rounded-2xl p-6 shadow-2xl z-50 max-w-md animate-slideUp">
        <p className="text-base text-gray-700 leading-relaxed">{text}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
        >
          Got it!
        </button>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
