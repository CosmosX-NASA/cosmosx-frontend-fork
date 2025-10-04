// 전역 상태 관리

import React, { createContext, useContext, useState } from "react";

const PaperContext = createContext();

export function PaperProvider({ children }) {
  const [selectedPapers, setSelectedPapers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(
    "Space Biology Knowledge Engine"
  );

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

  const value = {
    selectedPapers,
    searchKeyword,
    setSearchKeyword,
    togglePaper,
    clearSelection,
    isSelected,
  };

  return (
    <PaperContext.Provider value={value}>{children}</PaperContext.Provider>
  );
}

export function usePaperContext() {
  const context = useContext(PaperContext);
  if (!context) {
    throw new Error("usePaperContext must be used within PaperProvider");
  }
  return context;
}
