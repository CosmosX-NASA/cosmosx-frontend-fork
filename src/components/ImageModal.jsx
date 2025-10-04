import React from "react";

export default function ImageModal({ isOpen, onClose, image }) {
  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#C6C6C6] rounded-lg max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 이미지 */}
        <img
          src={image.url}
          alt={image.caption}
          className="w-full max-h-96 object-contain mb-4"
        />

        {/* 캡션 */}
        <div>
          <p className="text-sm text-gray-800">{image.caption}</p>
        </div>
      </div>
    </div>
  );
}
