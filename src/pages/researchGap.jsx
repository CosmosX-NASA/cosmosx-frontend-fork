import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import GapCard from "../components/GapCard";
import ChoiceList from "../components/ChoiceList";
import IntroModal from "../components/IntroModal";
import useGapSelection from "../hooks/useGapSelection";
import { analystDescriptions } from "../constants/ResearchGapData";
import { useQuery } from "@tanstack/react-query";

export default function ResearchGap() {
  const [activeCategory, setActiveCategory] = useState("conceptual");
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(true);
  const { selectedGaps, toggleGap, isSelected } = useGapSelection();
  const [searchParams] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["repoData", searchParams.get("papers")],
    queryFn: async () => {
      const response = await fetch(
        `/api/researchs/gaps?researchsIds=${searchParams.get("papers")}`
      );

      if (!response.ok) {
        throw new Error("Failed to load papers");
      }

      const result = await response.json();
      console.log("result:", result);
      return result;
    },
  });

  const researchGapData = useMemo(() => {
    const base = { conceptual: [], methodological: [], empirical: [] };

    if (!data?.gaps || !Array.isArray(data.gaps)) return base;

    for (const gap of data.gaps) {
      const key = String(gap?.type ?? "")
        .trim()
        .toLowerCase();

      if (key.startsWith("concept")) {
        base.conceptual = Array.isArray(gap?.researchs) ? gap.researchs : [];
      } else if (key.startsWith("method")) {
        base.methodological = Array.isArray(gap?.researchs)
          ? gap.researchs
          : [];
      } else if (key.startsWith("empir")) {
        base.empirical = Array.isArray(gap?.researchs) ? gap.researchs : [];
      } else {
        console.warn("Unknown gap type:", gap?.type);
      }
    }

    return base;
  }, [data]);

  const currentAnalyst = analystDescriptions[activeCategory];
  const currentGaps = researchGapData[activeCategory];

  return (
    <>
      <Toaster />

      <div className="h-screen bg-[#1D1D1D] text-white p-8 flex gap-6 overflow-hidden">
        {/* 왼쪽 영역 */}
        <div className="w-5/7 flex-1 flex flex-col gap-6 min-h-0">
          <div className="flex items-center gap-6 flex-shrink-0">
            <Link to="/" className="flex-shrink-0">
              <img
                src="/logo_icon.png"
                alt="Logo"
                className="w-14 h-14 object-contain cursor-pointer"
              />
            </Link>

            <h1 className="text-xl font-semibold">Research Gap</h1>

            {/* 3가지 기준 버튼 */}
            <div className="flex gap-4 ml-auto">
              <button
                onClick={() => setActiveCategory("conceptual")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === "conceptual" ? "ring-2 ring-white" : ""
                }`}
                style={{ backgroundColor: "#3E454B", color: "white" }}
              >
                Conceptual Analyst
              </button>
              <button
                onClick={() => setActiveCategory("methodological")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === "methodological" ? "ring-2 ring-white" : ""
                }`}
                style={{ backgroundColor: "#61707B", color: "white" }}
              >
                Methodological Analyst
              </button>
              <button
                onClick={() => setActiveCategory("empirical")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === "empirical" ? "ring-2 ring-white" : ""
                }`}
                style={{ backgroundColor: "#869DAD", color: "white" }}
              >
                Empirical Analyst
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-2xl p-6 flex gap-6 min-h-0">
            {/* 에이전트 설명 */}
            <div className="w-1/4 bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center text-center flex-shrink-0">
              <div className="text-6xl mb-4">{currentAnalyst.emoji}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {currentAnalyst.title}
              </h3>
              <p className="text-sm text-gray-600 italic">
                {currentAnalyst.description}
              </p>
            </div>

            {/* 메인 내용 */}
            <div className="flex-1 overflow-y-auto pr-2">
              {currentGaps.map((gap) => (
                <GapCard
                  key={gap.id}
                  gap={gap}
                  isChecked={isSelected(activeCategory, gap.id)}
                  onToggle={() => toggleGap(activeCategory, gap.id)}
                  categoryColor={currentAnalyst.color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-80 bg-[#1F1F1F] rounded-2xl p-6 border-2 border-white flex-shrink-0">
          <ChoiceList selectedGaps={selectedGaps} gapData={researchGapData} />
        </div>
      </div>

      {/* 인트로 모달 */}
      <IntroModal
        isOpen={isIntroModalOpen}
        onClose={() => setIsIntroModalOpen(false)}
      />
    </>
  );
}
