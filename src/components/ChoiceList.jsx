import React, { useState, useEffect } from 'react';
import HelpModal from './HelpModal';
import { HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ChoiceList({ selectedGaps, gapData }) {
  const [isHelpOpen1, setIsHelpOpen1] = useState(false);
  const [isHelpOpen2, setIsHelpOpen2] = useState(false);
  const [userId, setUserId] = useState('');
  const [generateCount, setGenerateCount] = useState(0);
  const [createdCount, setCreatedCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  let navigate = useNavigate();

  // 1) Initialize from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem('cosmosx_userId') || '';
    const storedGenerate = parseInt(
      localStorage.getItem('cosmosx_generateCount') || '0',
      10
    );
    setUserId(storedUserId);
    setGenerateCount(Number.isFinite(storedGenerate) ? storedGenerate : 0);
  }, []);

  // 2) Poll for completed hypotheses (every 3s) only when userId exists
  useEffect(() => {
    if (!userId) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/hypothesis/done?userId=${encodeURIComponent(userId)}`
        );
        if (res.ok) {
          // The API may return either `{ count: number }` or a plain number
          const data = await res.json();
          const count = typeof data === 'number' ? data : data?.count;
          if (typeof count === 'number') {
            setCreatedCount(count);
          }
        }
      } catch (err) {
        console.error('Polling /api/hypothesis/done failed:', err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [userId]);

  // 3) Compute progressCount = generateCount - createdCount (never below 0)
  useEffect(() => {
    setProgressCount(Math.max(0, generateCount - createdCount));
  }, [generateCount, createdCount]);

  // 선택된 GAP 정보 가져오기
  const getSelectedGapInfo = () => {
    const result = [];

    Object.entries(selectedGaps).forEach(([category, gapIds]) => {
      gapIds.forEach((gapId) => {
        const gap = gapData[category].find((g) => g.id === gapId);
        if (gap) {
          result.push({
            ...gap,
            category,
          });
        }
      });
    });

    return result;
  };

  const selectedGapList = getSelectedGapInfo();

  const generateHypothesis = async () => {
    const gapIds = selectedGapList
      .map((g) => g.id)
      .filter((id) => typeof id === 'number');

    if (gapIds.length === 0) return; // 빈 배열이면 요청하지 않음
    console.log('Generating hypothesis for gaps:', gapIds, 'userId:', userId);
    try {
      const res = await fetch('/api/hypothesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId || '', gapIds }),
      });

      if (res.ok) {
        // 서버는 즉시 200을 반환하며, userId를 함께 반환할 수 있음
        let returnedUserId = '';
        try {
          const body = await res.json();
          returnedUserId = body?.userId ?? body?.data?.userId ?? '';
        } catch (_) {
          // 응답 본문이 없거나 JSON이 아닐 수 있음 -> 무시
        }

        // userId가 없었고 서버가 새 userId를 돌려줬다면 저장
        if (!userId && returnedUserId) {
          setUserId(returnedUserId);
          localStorage.setItem('cosmosx_userId', returnedUserId);
        }

        // generateCount 증가 및 localStorage 반영
        setGenerateCount((prev) => {
          const next = prev + 1;
          localStorage.setItem('cosmosx_generateCount', String(next));
          return next;
        });
      }
    } catch (err) {
      console.error('Failed to request hypothesis generation:', err);
    }
  };

  const navigateToHypothesisPage = () => {
    navigate('/hypo');
  };

  // 기준마다 배경색 지정
  const getCategoryColor = (category) => {
    const colors = {
      conceptual: '#3E454B',
      methodological: '#61707B',
      empirical: '#869DAD',
    };
    return colors[category] || '#999999';
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Check List
      </h2>

      {/* 사용자가 선택한 ResearcbGap 리스트 쌓기 */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-6">
        {selectedGapList.length === 0 ? (
          <p className="text-gray-400 text-center text-sm">Not selected</p>
        ) : (
          selectedGapList.map((gap, _) => (
            <div
              key={`${gap.category}-${gap.id}`}
              className="p-3 text-white rounded-lg"
              style={{ backgroundColor: getCategoryColor(gap.category) }}
            >
              <p className="text-sm">{gap.title}</p>
            </div>
          ))
        )}
      </div>

      {/* Generate Hypothesis */}
      <button
        disabled={progressCount > 2}
        onClick={generateHypothesis}
        className={`w-full ${
          progressCount > 2 ? 'bg-[#dcdcdc]' : 'bg-[#555555]'
        } text-white py-4 rounded-lg ${
          progressCount > 2 ? 'hover:bg-[#dfdfdf]' : 'hover:bg-[#717171]'
        } transition-colors mb-4`}
      >
        <div className="flex items-center justify-center gap-[10px] pr-2">
          <div
            onClick={() => setIsHelpOpen1(true)}
            className="p-1 rounded-full flex items-center justify-center transition-colors hover:bg-white z-10"
          >
            <HelpCircle className="w-5 h-5 text-white hover:text-gray-900" />
          </div>
          <p>Generate Hypothesis</p>
        </div>
      </button>

      {/* Hypothesis Page */}
      <button
        onClick={navigateToHypothesisPage}
        className="w-full bg-[#343434] text-white py-4 rounded-lg hover:bg-[#333333] transition-colors"
      >
        <div className="flex items-center justify-center gap-[10px] pr-2">
          {progressCount > 0 ? (
            <div className="relative ring-host w-7 h-7 md:w-9 md:h-9">
              <div className="absolute inset-0 dotted-ring pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="dot" style={{ '--i': i }} />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center font-semibold text-sm md:text-base count-anim">
                {progressCount}
              </div>
            </div>
          ) : (
            <div
              onClick={() => setIsHelpOpen2(true)}
              className="p-1 rounded-full flex items-center justify-center transition-colors hover:bg-white mr-2 z-10"
            >
              <HelpCircle className="w-5 h-5 text-white hover:text-gray-900" />
            </div>
          )}
          <p>Hypothesis Page</p>
        </div>
      </button>
      <HelpModal
        isOpen={isHelpOpen1}
        onClose={() => setIsHelpOpen1(false)}
        text={
          'Clicking the Generate Hypothesis button will generate a hypothesis based on the selected Research Gap. While the hypothesis is being generated, you can generate another hypothesis. The generated hypothesis can be viewed on the Hypothesis Page.'
        }
      />
      <HelpModal
        isOpen={isHelpOpen2}
        onClose={() => setIsHelpOpen2(false)}
        text={
          'The Hypothesis Page displays the generated hypotheses based on the selected Research Gaps. You can review and refine your hypotheses on this page.'
        }
      />
      <style>
        {`
          @property --h {
            syntax: '<angle>';
            inherits: true;
            initial-value: 0deg;
          }
          .ring-host {
            --h: 0deg;
            animation: hueSpin 8s linear infinite;
          }
          .dotted-ring { 
            position: absolute; 
            inset: 0; 
            --r: 15px; /* radius of the ring */
          }
          .dotted-ring .dot {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 3px;
            height: 3px;
            border-radius: 9999px; /* fully rounded */
            background: hsl(200 90% 60%);
            opacity: 0.35;
            transform: translate(-50%, -50%) rotate(calc(var(--i) * 30deg)) translate(var(--r));
            filter: hue-rotate(var(--h)) brightness(0.7);
            animation: ringPulse 1.2s linear infinite;
            animation-delay: calc(var(--i) * 0.08s);
            will-change: opacity, filter;
            pointer-events: none;
          }
          .count-anim {
            color: hsl(var(--h) 90% 70%);
            transition: color 0.2s linear;
          }
          @keyframes ringPulse {
            0%, 20% { opacity: 0.35; filter: brightness(0.7); }
            50% { opacity: 1; filter: brightness(1.9); }
            100% { opacity: 0.35; filter: brightness(0.7); }
          }
          @keyframes hueSpin {
            to { --h: 360deg; }
          }
        `}
      </style>
    </div>
  );
}
