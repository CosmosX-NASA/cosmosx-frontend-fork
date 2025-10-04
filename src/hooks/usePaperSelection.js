// 논문 선택 로직

import { useState } from "react";

export default function usePaperSelection() {
  const [selectedPapers, setSelectedPapers] = useState([]); // 체크박스 선택
  const [viewedPaper, setViewedPaper] = useState(null); // 현재 보고 있는 논문

  const togglePaper = (paperId) => {
    setSelectedPapers((prev) =>
      prev.includes(paperId)
        ? prev.filter((id) => id !== paperId)
        : [...prev, paperId]
    );
  };

  const selectPaperToView = (paperId) => {
    setViewedPaper(paperId);
  };

  const clearSelection = () => {
    setSelectedPapers([]);
  };

  const isSelected = (paperId) => {
    return selectedPapers.includes(paperId);
  };

  const isViewed = (paperId) => {
    return viewedPaper === paperId;
  };

  return {
    selectedPapers,
    viewedPaper,
    togglePaper,
    selectPaperToView,
    clearSelection,
    isSelected,
    isViewed,
  };
}
