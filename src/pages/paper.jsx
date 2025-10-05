import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HelpCircle, Send } from "lucide-react";
import PaperCard from "../components/PaperCard";
import PaperDetail from "../components/PaperDetail";
import HelpModal from "../components/HelpModal";
import usePaperSelection from "../hooks/usePaperSelection";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PaperCardSkeleton from "../components/PaperCardSkeleton";

const SKELETON_COUNT = 5;

function ListMessage({ message }) {
  return (
    <div className="text-sm text-gray-400 py-6 text-center">{message}</div>
  );
}

export default function Paper() {
  const {
    selectedPapers,
    viewedPaper,
    togglePaper,
    selectPaperToView,
    isSelected,
    isViewed,
  } = usePaperSelection();
  let navigate = useNavigate();

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData", searchParams.get("query")],
    queryFn: async () => {
      const response = await fetch(
        `/api/researchs?search=${searchParams.get("query")}&pageSize=5`
      );

      if (!response.ok) {
        throw new Error("Failed to load papers");
      }

      return response.json();
    },
  });

  const query = searchParams.get("query") ?? "";
  const papers = data?.researchs ?? [];
  const currentPaper = useMemo(
    () => papers.find((paper) => paper.id === viewedPaper),
    [papers, viewedPaper]
  );

  const handleFindResearchGap = (event) => {
    event.preventDefault();
    if (selectedPapers.length === 0) {
      alert("Please select at least one paper to find research gaps.");
      return;
    }

    console.log("Finding research gaps for papers:", selectedPapers);
    navigate(`/research-gap?papers=${selectedPapers.join(",")}`);
  };

  const paperListContent = (() => {
    if (isPending) {
      return Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <PaperCardSkeleton key={`paper-skeleton-${index}`} />
      ));
    }

    if (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while loading papers.";
      return <ListMessage message={`Error: ${message}`} />;
    }

    if (papers.length === 0) {
      return <ListMessage message="No papers found for this topic." />;
    }

    return papers.map((paper) => (
      <PaperCard
        key={paper.id}
        title={paper.title}
        description={`${paper.release_date?.slice(0, 7) ?? "N/A"} | ${
          paper.journal
        } | ${paper.author}`}
        isChecked={isSelected(paper.id)}
        isViewed={isViewed(paper.id)}
        onToggle={() => togglePaper(paper.id)}
        onView={() => selectPaperToView(paper.id)}
      />
    ));
  })();

  return (
    <div className="max-h-screen text-white flex p-8 gap-8">
      {/* 왼쪽 영역 */}
      <div className="w-2/5 flex flex-col">
        <div className="flex items-center gap-6 mb-6">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo_icon.png"
              alt="Logo"
              className="w-14 h-14 object-contain cursor-pointer"
            />
          </Link>

          <div className="flex-1 border border-white rounded-lg px-4 py-3">
            <span className="text-base">Topics: </span>
            <span>{query}</span>
          </div>
        </div>

        {/* 5개의 논문 리스트 */}
        <div className="flex-1 overflow-y-auto">{paperListContent}</div>

        {/* 하단 버튼 영역 */}
        <div className="flex items-center mt-6 gap-6">
          <button
            onClick={() => setIsHelpOpen(true)}
            className="p-2 bg-white rounded-full flex items-center justify-center transition-colors"
          >
            <HelpCircle className="w-6 h-6 text-gray-900" />
          </button>

          <button
            onClick={handleFindResearchGap}
            className="flex items-center gap-2 bg-white text-gray-900 w-full py-3 rounded-xl font-semibold hover:bg-[#869DAD] hover:text-white transition-colors justify-center"
          >
            <Send className="w-5 h-5" />
            Find Research Gap
          </button>
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className="w-3/5 flex flex-col overflow-auto break-words">
        <PaperDetail paper={currentPaper} isLoading={isPending} />
      </div>

      {/* 도움말 모달 */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        text="Select at least one out of the five papers to identify the RESEARCH
          GAP related to your topic of interest."
      />
    </div>
  );
}
