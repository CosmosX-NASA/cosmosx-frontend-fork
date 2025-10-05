import { useEffect, useMemo, useState } from "react";

const normalizeHypotheses = (rawHypotheses) => {
  if (!Array.isArray(rawHypotheses)) return [];
  return rawHypotheses.filter(Boolean);
};

export default function useHypotheses(initialHypotheses = []) {
  const normalizedInitial = useMemo(
    () => normalizeHypotheses(initialHypotheses),
    [initialHypotheses]
  );

  const [hypotheses, setHypotheses] = useState(normalizedInitial);
  const [viewedHypothesisId, setViewedHypothesisId] = useState(
    normalizedInitial[0]?.id ?? null
  );

  useEffect(() => {
    setHypotheses(normalizedInitial);
  }, [normalizedInitial]);

  useEffect(() => {
    if (normalizedInitial.length === 0) {
      setViewedHypothesisId(null);
      return;
    }

    const hasViewed = normalizedInitial.some(
      (hypothesis) => hypothesis.id === viewedHypothesisId
    );

    if (!hasViewed) {
      setViewedHypothesisId(normalizedInitial[0].id);
    }
  }, [normalizedInitial, viewedHypothesisId]);

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
