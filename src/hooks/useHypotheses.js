import { useState } from "react";

export default function useHypotheses(initialHypotheses) {
  const [hypotheses, setHypotheses] = useState(initialHypotheses);
  const [viewedHypothesisId, setViewedHypothesisId] = useState(null);

  const selectHypothesis = (id) => {
    setViewedHypothesisId(id);
  };

  const addHypothesis = (newHypothesis) => {
    setHypotheses((prev) => [...prev, newHypothesis]);
  };

  const isViewed = (id) => {
    return viewedHypothesisId === id;
  };

  return {
    hypotheses,
    viewedHypothesisId,
    selectHypothesis,
    addHypothesis,
    isViewed,
  };
}
