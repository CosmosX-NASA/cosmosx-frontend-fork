import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Rocket, HelpCircle, Send } from "lucide-react";
import PaperCard from "../components/PaperCard";
import HelpModal from "../components/HelpModal";
import usePaperSelection from "../hooks/usePaperSelection";
import { paperData } from "../constants/PaperCardData";

export default function Paper() {
  const { selectedPapers, togglePaper, isSelected } = usePaperSelection();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="max-h-screen bg-[#2D2D2D] text-white flex p-8 gap-8">
      {/* 왼쪽 영역 */}
      <div className="w-2/5 flex flex-col">
        <div className="flex items-center gap-6 mb-6">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain cursor-pointer"
            />
          </Link>

          <div className="flex-1 border border-white rounded-lg px-4 py-3">
            <span className="text-base">Topics: </span>
            <span>Space Biology Knowledge Engine</span>
          </div>
        </div>

        {/* 5개의 논문 리스트 */}
        <div className="flex-1 overflow-y-auto">
          {paperData.map((paper) => (
            <PaperCard
              key={paper.id}
              title={paper.title}
              journal={paper.journal}
              description={paper.description}
              isChecked={isSelected(paper.id)}
              onToggle={() => togglePaper(paper.id)}
            />
          ))}
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex items-center mt-6 gap-6">
          <button
            onClick={() => setIsHelpOpen(true)}
            className="p-2 bg-white rounded-full flex items-center justify-center transition-colors"
          >
            <HelpCircle className="w-6 h-6 text-gray-900" />
          </button>

          <button className="flex items-center gap-2 bg-white text-gray-900 w-full py-3 rounded-xl font-semibold hover:bg-[#717171] hover:text-white transition-colors justify-center">
            <Send className="w-5 h-5" />
            Find Research Gap
          </button>
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className="w-3/5 flex items-center justify-center">
        <div className="bg-[#717171] rounded-2xl w-full h-full flex items-center justify-center">
          <p className="text-white text-center px-8">
            When you click on the paper,
            <br />
            you can access the summarized core content.
          </p>
        </div>
      </div>

      {/* 도움말 모달 */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
