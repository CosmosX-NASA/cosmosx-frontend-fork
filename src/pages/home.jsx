import React from "react";
import { Search } from "lucide-react";
import FeatureCard from "../components/HomeCard";

export default function Home() {
  const cards = [
    {
      id: 1,
      image: "/main01.png",
      title: "Discover and summarize papers related to your topic",
    },
    {
      id: 2,
      image: "/main02.png",
      title: "Identify research gaps from the selected papers",
    },
    {
      id: 3,
      image: "/main03.png",
      title: "Review the hypotheses",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2D2D2D] text-white">
      <header className="border-b border-white">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">CosmosX</h1>
        </div>
      </header>

      {/* 가운데 영역 */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center text-white mb-12">
          <h2 className="text-2xl font-bold mb-4">
            From Paper Discovery to Hypothesis, All in One Flow
          </h2>
          <p className="text-base">
            CosmosX guides you step by step through the journey of finding and
            shaping your research ideas.
          </p>
        </div>

        {/* 카드뉴스 3개 */}
        <div className="flex justify-center gap-6 mb-12">
          {cards.map((card) => (
            <FeatureCard
              key={card.id}
              imageSrc={card.image}
              title={card.title}
            />
          ))}
        </div>

        {/* 검색바 */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
              <Search className="w-6 h-6 text-gray-800" />
            </div>
            <input
              type="text"
              placeholder="What topics are you interested in?"
              className="w-full pl-16 pr-6 py-5 rounded-full text-lg text-gray-500 bg-white focus:outline-none focus:ring-5 focus:ring-black transition-all"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
