import React from 'react';
import { Link as LinkIcon } from 'lucide-react';

export default function HypothesisDetail({ hypothesis }) {
  if (!hypothesis) {
    return (
      <div className="bg-gray-100 rounded-2xl w-full h-full flex items-center justify-center">
        <p className="text-gray-500 text-center px-8">
          Select a hypothesis to view details
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl w-full h-full overflow-y-auto p-8 stroke-12">
      {/* Statement */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Statement</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {hypothesis.statement}
        </p>
      </div>

      {/* Evidence */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Evidence</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {hypothesis.evidence}
        </p>
      </div>

      {/* References */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">References</h2>
        <div className="flex gap-3">
          {hypothesis.references.map((ref, index) => (
            <a
              key={ref.id}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
              Paper {index + 1}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
