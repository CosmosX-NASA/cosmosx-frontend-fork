import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const COUNTS = [
  'The first',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
  'Seventh',
  'Eighth',
  'Ninth',
  'Tenth',
  'Eleventh',
  'Twelfth',
  'Thirteenth',
  'Fourteenth',
  'Fifteenth',
  'Sixteenth',
  'Seventeenth',
  'Eighteenth',
  'Nineteenth',
  'Twentieth',
  'Twenty-first',
  'Twenty-second',
  'Twenty-third',
  'Twenty-fourth',
  'Twenty-fifth',
  'Twenty-sixth',
  'Twenty-seventh',
  'Twenty-eighth',
  'Twenty-ninth',
  'Thirtieth',
];

export default function HypothesisCard({
  index,
  isViewed,
  onView,
  isAddButton = false,
}) {
  if (isAddButton) {
    return (
      <Link to="/research-gap">
        <button className="w-full bg-gray-400 text-gray-700 rounded-2xl p-6 mb-6 font-semibold hover:bg-gray-500 transition-colors flex items-center justify-center gap-2 border-2 border-gray-500">
          <Plus className="w-6 h-6" />
          Add
        </button>
      </Link>
    );
  }

  return (
    <button
      onClick={onView}
      className={`w-full rounded-2xl p-6 font-medium transition-all text-center ${
        isViewed
          ? 'bg-white text-gray-900 ring-2 ring-gray-900'
          : 'bg-white text-gray-900 hover:bg-gray-100'
      }`}
    >
      {COUNTS[index]} hypothesis
    </button>
  );
}
