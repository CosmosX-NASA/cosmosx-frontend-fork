export default function PaperCardSkeleton() {
  return (
    <div className="flex items-start gap-6 mb-4 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-[#3A3A3A]" />
      <div className="flex-1 p-4 rounded-lg bg-white/10">
        <div className="h-4 bg-white/30 rounded w-3/4 mb-3" />
        <div className="h-4 bg-white/30 rounded w-3/4 mb-3" />
        <div className="h-3 bg-white/20 rounded w-1/2 mb-2" />
        <div className="h-3 bg-white/20 rounded w-1/2" />
      </div>
    </div>
  );
}
