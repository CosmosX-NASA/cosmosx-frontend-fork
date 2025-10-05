import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import HypothesisCard from '../components/HypothesisCard';
import HypothesisDetail from '../components/HypothesisDetail';
import useHypotheses from '../hooks/useHypotheses';
import { downloadMarkdown } from '../utils/downloadUtils';
import { useQuery } from '@tanstack/react-query';

const getStoredUserId = () => {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem('cosmosx_userId') || '';
};

const normalizeReference = (entry, index) => {
  if (!entry) return null;

  if (typeof entry === 'string') {
    return {
      id: index,
      title: entry,
      url: entry,
    };
  }

  const url = entry.url ?? entry.href ?? '';
  if (!url) return null;

  return {
    id: entry.id ?? index,
    title: entry.title ?? `Reference ${index + 1}`,
    url,
  };
};

const normalizeHypothesis = (raw, index) => {
  if (!raw) {
    return {
      id: `hypothesis-${index}`,
      title: `Hypothesis ${index + 1}`,
      statement: '',
      evidence: '',
      usage: '',
      references: [],
    };
  }

  const referencesSource = Array.isArray(raw.research_urls)
    ? raw.research_urls
    : Array.isArray(raw.references)
    ? raw.references
    : [];

  const references = referencesSource
    .map((entry, refIndex) => normalizeReference(entry, refIndex))
    .filter(Boolean);

  const fallbackTitle = raw.title ?? raw.statement ?? `Hypothesis ${index + 1}`;

  return {
    id: raw.id ?? `hypothesis-${index}`,
    title: fallbackTitle,
    statement: raw.statement ?? '',
    evidence: raw.evidence ?? '',
    usage: raw.usage ?? '',
    references,
  };
};

export default function Hypotheses() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userIdParam = searchParams.get('userId') || '';

  React.useEffect(() => {
    if (!userIdParam || typeof window === 'undefined') return;
    window.localStorage.setItem('cosmosx_userId', userIdParam);
  }, [userIdParam]);

  const {
    isPending,
    isError,
    error,
    data: fetchedHypotheses = [],
  } = useQuery({
    queryKey: ['hypotheses', userIdParam || 'me'],
    queryFn: async () => {
      const resolvedUserId = userIdParam || getStoredUserId();
      let apiUrl = 'https://api.cosmosx.site/api/hypothesis/me';
      if (resolvedUserId) {
        apiUrl += `?userId=${encodeURIComponent(resolvedUserId)}`;
      }
      console.log('Fetching hypotheses from:', apiUrl);
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const message = await response.text().catch(() => '');
        throw new Error(message || 'Failed to load hypotheses');
      }

      let results = await response.json();
      results = results['hypotheses'];
      if (!Array.isArray(results)) {
        return [];
      }
      results = results.filter((hypo) => hypo && hypo.status === 'DONE');

      const res = results.map((result, index) =>
        normalizeHypothesis(result, index)
      );
      return res;
    },
    suspense: false,
  });

  const { hypotheses, viewedHypothesisId, selectHypothesis, isViewed } =
    useHypotheses(fetchedHypotheses);

  const currentHypothesis = hypotheses.find((h) => h.id === viewedHypothesisId);

  return (
    <div className="h-screen text-white p-8 flex flex-col overflow-hidden">
      <div className="flex items-center gap-6 mb-6 flex-shrink-0">
        <Link to="/" className="flex-shrink-0">
          <img
            src="/logo_icon.png"
            alt="Logo"
            className="w-14 h-14 object-contain cursor-pointer"
          />
        </Link>
        <h1 className="text-xl font-semibold">
          A list of generated hypotheses
        </h1>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* 왼쪽 영역 */}
        <div className="w-2/5 flex flex-col gap-8">
          <div className="flex-1 bg-gray-300 rounded-2xl p-6 overflow-y-auto space-y-4">
            {/* Add 버튼 */}
            <HypothesisCard isAddButton={true} />

            {/* 가설 목록 */}
            {isPending && (
              <p className="text-gray-700 text-sm">Loading hypotheses...</p>
            )}
            {isError && !isPending && (
              <p className="text-red-700 text-sm">
                Failed to load hypotheses
                {error?.message ? `: ${error.message}` : ''}
              </p>
            )}
            {!isPending && !isError && hypotheses.length === 0 && (
              <p className="text-gray-700 text-sm">
                No hypotheses available yet.
              </p>
            )}
            {hypotheses.map((hypothesis, index) => (
              <HypothesisCard
                key={hypothesis.id}
                index={index}
                isViewed={isViewed(hypothesis.id)}
                onView={() => selectHypothesis(hypothesis.id)}
              />
            ))}
          </div>
          <button
            onClick={() => downloadMarkdown(hypotheses)}
            className="flex justify-center items-center gap-4 text-lg w-full bg-gray-600 text-white py-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
          >
            <img
              alt="Home"
              src="/src/assets/markdown.png"
              width={30}
              height={30}
            />
            <p>Markdown Download</p>
          </button>
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-3/5 flex flex-col gap-8">
          <div className="flex-1 min-h-0">
            {isPending ? (
              <div className="bg-gray-100 rounded-2xl w-full h-full flex items-center justify-center">
                <p className="text-gray-500 text-center px-8">
                  Loading hypothesis...
                </p>
              </div>
            ) : (
              <HypothesisDetail hypothesis={currentHypothesis} />
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 flex-shrink-0">
            <button
              onClick={() => navigate(-1)}
              className="flex justify-center items-center gap-2 w-full bg-gray-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              <img
                alt="Home"
                src="/src/assets/back.png"
                width={28}
                height={28}
              />
              <p>Back to Research Gap</p>
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex w-full bg-gray-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-700 transition-colors justify-center items-center gap-4"
            >
              <img
                alt="Home"
                src="/src/assets/home.png"
                width={24}
                height={24}
              />
              <p>Go Home</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
