import React from "react";
import { Link } from "react-router-dom";
import HypothesisCard from "../components/HypothesisCard";
import HypothesisDetail from "../components/HypothesisDetail";
import useHypotheses from "../hooks/useHypotheses";
import { hypothesesData } from "../constants/HypothesesData";
import { downloadMarkdown, downloadPDF } from "../utils/downloadUtils";

export default function Hypotheses() {
  const { hypotheses, viewedHypothesisId, selectHypothesis, isViewed } =
    useHypotheses(hypothesesData);

  const currentHypothesis = hypotheses.find((h) => h.id === viewedHypothesisId);

  return (
    <div className="h-screen bg-[#1A1A1A] text-white p-8 flex flex-col overflow-hidden">
      <div className="flex items-center gap-6 mb-6 flex-shrink-0">
        <Link to="/" className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain cursor-pointer"
          />
        </Link>
        <h1 className="text-xl font-semibold">
          A list of generated hypotheses
        </h1>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* 왼쪽 영역 */}
        <div className="w-2/5 flex flex-col gap-8">
          <div className="flex-1 bg-gray-300 rounded-2xl p-6 overflow-y-auto space-y-4">
            {/* Add 버튼 */}
            <HypothesisCard isAddButton={true} />

            {/* 가설 목록 */}
            {hypotheses.map((hypothesis) => (
              <HypothesisCard
                key={hypothesis.id}
                hypothesis={hypothesis}
                isViewed={isViewed(hypothesis.id)}
                onView={() => selectHypothesis(hypothesis.id)}
              />
            ))}
          </div>
          <Link to="/" className="flex-shrink-0">
            <button className="w-full bg-gray-600 text-white py-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors">
              Home
            </button>
          </Link>
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-3/5 flex flex-col gap-8">
          <div className="flex-1 min-h-0">
            <HypothesisDetail hypothesis={currentHypothesis} />
          </div>

          <div className="grid grid-cols-2 gap-8 flex-shrink-0">
            <button
              onClick={() => downloadMarkdown(hypotheses)}
              className="w-full bg-gray-600 text-white py-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
            >
              Markdown Download
            </button>
            <button
              onClick={() => downloadPDF(hypotheses)}
              className="w-full bg-gray-600 text-white py-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
            >
              PDF Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
