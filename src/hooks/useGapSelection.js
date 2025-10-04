import { useState } from "react";
import { toast } from "react-hot-toast";

export default function useGapSelection() {
  const [selectedGaps, setSelectedGaps] = useState({
    conceptual: [],
    methodological: [],
    empirical: [],
  });

  const toggleGap = (category, gapId) => {
    setSelectedGaps((prev) => {
      const categoryGaps = prev[category];
      const isSelected = categoryGaps.includes(gapId);

      // 현재 전체 선택된 ResearchGap 개수 계산
      const totalSelected =
        prev.conceptual.length +
        prev.methodological.length +
        prev.empirical.length;

      // 5개 제한
      if (!isSelected && totalSelected >= 5) {
        toast.error("You can select up to 5 research gaps only.", {
          position: "top-center",
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "12px",
            padding: "12px 24px",
            borderRadius: "20px",
          },
        });
        return prev;
      }

      return {
        ...prev,
        [category]: isSelected
          ? categoryGaps.filter((id) => id !== gapId)
          : [...categoryGaps, gapId],
      };
    });
  };

  const isSelected = (category, gapId) =>
    selectedGaps[category].includes(gapId);

  const clearSelection = () => {
    setSelectedGaps({
      conceptual: [],
      methodological: [],
      empirical: [],
    });
  };

  const totalSelected =
    selectedGaps.conceptual.length +
    selectedGaps.methodological.length +
    selectedGaps.empirical.length;

  return {
    selectedGaps,
    toggleGap,
    isSelected,
    clearSelection,
    totalSelected,
  };
}
