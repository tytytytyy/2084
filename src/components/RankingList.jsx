import PlayerCard from "./PlayerCard";

export default function RankingList({ data = [] }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-50 to-indigo-100 p-6">

      <h1 className="text-center text-4xl font-black text-slate-700 mb-6">
        Harmonyboard
      </h1>

      <div className="max-w-3xl mx-auto grid gap-3">
        {data.length === 0 ? (
          <div className="text-center text-slate-500">
            Keine Daten geladen
          </div>
        ) : (
          data.map((p, i) => (
            <PlayerCard key={i} player={{ ...p, rank: i + 1 }} />
          ))
        )}
      </div>

    </div>
  );
}