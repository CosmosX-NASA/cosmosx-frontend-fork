import React from "react";

export default function ChoiceList({ selectedGaps, gapData }) {
  // 선택된 GAP 정보 가져오기
  const getSelectedGapInfo = () => {
    const result = [];

    Object.entries(selectedGaps).forEach(([category, gapIds]) => {
      gapIds.forEach((gapId) => {
        const gap = gapData[category].find((g) => g.id === gapId);
        if (gap) {
          result.push({
            ...gap,
            category,
          });
        }
      });
    });

    return result;
  };

  const selectedGapList = getSelectedGapInfo();

  // 기준마다 배경색 지정
  const getCategoryColor = (category) => {
    const colors = {
      conceptual: "#3E454B",
      methodological: "#61707B",
      empirical: "#869DAD",
    };
    return colors[category] || "#999999";
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Check List
      </h2>

      {/* 사용자가 선택한 ResearcbGap 리스트 쌓기 */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-6">
        {selectedGapList.length === 0 ? (
          <p className="text-gray-400 text-center text-sm">Not selected</p>
        ) : (
          selectedGapList.map((gap, index) => (
            <div
              key={`${gap.category}-${gap.id}`}
              className="p-3 text-white"
              style={{ backgroundColor: getCategoryColor(gap.category) }}
            >
              <p className="text-sm">{gap.title}</p>
            </div>
          ))
        )}
      </div>
      {/* Generate Hypothesis */}
      <button className="w-full bg-[#717171] text-white py-4 rounded-lg hover:bg-[#555555] transition-colors mb-4">
        Generate Hypothesis
      </button>

      {/* Hypothesis Page */}
      <button className="w-full bg-[#717171] text-white py-4 rounded-lg hover:bg-[#555555] transition-colors">
        Hypothesis Page
      </button>
    </div>
  );
}
