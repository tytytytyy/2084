export default function PlayerCard({ player }) {
  const bg =
    player.rank === 1
      ? "bg-yellow-100 border-yellow-300"
      : player.rank === 2
      ? "bg-sky-100 border-sky-300"
      : player.rank === 3
      ? "bg-indigo-100 border-indigo-300"
      : "bg-white border-slate-200";

  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl border shadow-sm ${bg}`}>

      {/* Rank */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white border text-slate-700 font-bold">
        {player.rank}
      </div>

      {/* Name */}
      <div className="flex-1 ml-4 text-slate-800 font-semibold">
        {player.name || "No Name"}
      </div>

      {/* Score */}
      <div className="px-4 py-1 rounded-full bg-white border text-slate-700 font-bold">
        {player.score ?? "-"}
      </div>

    </div>
  );
}