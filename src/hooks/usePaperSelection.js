// 논문 선택 로직

import { useState } from "react";

export default function usePaperSelection() {
  const [selectedPapers, setSelectedPapers] = useState([]);

  const togglePaper = (paperId) => {
    setSelectedPapers((prev) =>
      prev.includes(paperId)
        ? prev.filter((id) => id !== paperId)
        : [...prev, paperId]
    );
  };

  const clearSelection = () => {
    setSelectedPapers([]);
  };

  const isSelected = (paperId) => {
    return selectedPapers.includes(paperId);
  };

  return {
    selectedPapers,
    togglePaper,
    clearSelection,
    isSelected,
  };
}
