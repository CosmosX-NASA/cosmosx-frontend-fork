import React from "react";

export default function IntroModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/90 z-40 transition-opacity" />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-lg mx-4 shadow-2xl animate-fadeIn">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Proceed as follows!
          </h2>

          <div className="text-gray-700 space-y-4 mb-6 text-sm leading-relaxed">
            <p>
              First, based on the paper you just selected, identify the research
              gap according to the three criteria listed above.
            </p>
            <p>
              Next, check the boxes for the topics you’re interested in to
              generate hypotheses based on them. You can select up to five
              items, and you may create multiple hypotheses.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-[#C6C6C6] text-white rounded-lg font-semibold hover:bg-[#869DAD] transition-colors"
          >
            OK!
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
