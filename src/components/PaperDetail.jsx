import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import ImageModal from './ImageModal';

export default function PaperDetail({ paper, isLoading = false }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-[#E8E8E8] rounded-2xl w-full h-full flex items-center justify-center">
        <div
          className="w-12 h-12 border-4 border-gray-300 border-t-[#555555] rounded-full animate-spin"
          role="status"
          aria-label="Loading paper details"
        />
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="bg-[#555555] rounded-2xl w-full h-full flex items-center justify-center">
        <p className="text-white text-center px-8">
          When you click on the paper,
          <br />
          you can access the summarized core content.
        </p>
      </div>
    );
  }

  const openModal = (figure) => {
    setSelectedImage(figure);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const doiLink = paper.doi
    ? paper.doi.startsWith('http')
      ? paper.doi
      : `https://doi.org/${paper.doi}`
    : null;

  return (
    <div className="bg-[#E8E8E8] rounded-2xl w-full h-full overflow-y-auto p-8">
      {/* title & information */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-3">{paper.title}</h1>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Journal:</span> {paper.journal}
          </p>
          <p>
            <span className="font-semibold">Author:</span> {paper.author}
          </p>
          <p>
            <span className="font-semibold">Release Date:</span>{' '}
            {paper.release_date}
          </p>
          {doiLink && (
            <a
              href={doiLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white px-3 py-2 mt-3 rounded-lg
             hover:bg-[#717171] hover:text-white transition-colors w-max"
            >
              <ExternalLink className="w-4 h-4" />
              View Original
            </a>
          )}
        </div>
      </div>

      {/* Image */}
      {paper.figures && paper.figures.length > 0 && (
        <div className="mb-6">
          <div className="flex gap-4 overflow-x-auto">
            {paper.figures.map((figure, index) => (
              <div key={index} className="flex-shrink-0 w-80 cursor-pointer">
                <img
                  src={figure.url}
                  alt={figure.caption}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                  onClick={() => openModal(figure)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {paper.brief_summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Brief Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {paper.brief_summary.replace('*', '')}
          </p>
        </div>
      )}

      {paper.overall_summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Overall Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {paper.overall_summary.replace('*', '')}
          </p>
        </div>
      )}

      {/* Methods */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Methods</h2>
        {paper.methods.split(' || ').map((method, index) => (
          <p key={index} className="text-sm text-gray-700 leading-relaxed mb-2">
            {method.replace('*', '')}
          </p>
        ))}
      </div>

      {/* Results */}
      {paper.results && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Results</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {paper.results.replace('*', '')}
          </p>
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}
