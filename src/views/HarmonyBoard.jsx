import { useCharacters } from "../hooks/useCharacters";
import { useGoogleSync } from "../hooks/useGoogleSync";
import { getVoteAllowance } from "../utils/voteAllowance";
import { SHEET_URL } from "../config";

export default function HarmonyBoard() {
  const { characters } = useCharacters();

  useGoogleSync(SHEET_URL);

  // 🧠 SORTIERUNG: höchste Punkte zuerst
  const sortedCharacters = [...characters].sort(
    (a, b) => (b.score ?? 0) - (a.score ?? 0),
  );

  const third = Math.ceil(sortedCharacters.length / 3);

  return (
    <div className="p-6">
      {/* TITLE */}
      <h1 className="text-2xl text-center font-bold text-sky-700 mb-6">
        📊 Harmony Board
      </h1>

      {/* EMPTY STATE */}
      {sortedCharacters.length === 0 && (
        <p className="text-slate-400">Keine Charaktere vorhanden</p>
      )}

      {/* RANKING LIST */}
      <div className="space-y-3">
        {sortedCharacters.map((c, index) => {
          const allowance = getVoteAllowance(c, sortedCharacters);

          const colorClass =
            allowance === 2
              ? "bg-green-100 border-green-400"
              : allowance === 1
                ? "bg-yellow-100 border-yellow-400"
                : "bg-red-100 border-red-400";

          return (
            <div
              key={c.id}
              className={`p-4 border rounded-xl flex items-center justify-between shadow-sm ${colorClass}`}
            >
              {/* 🏆 RANK */}
              <div className="text-xl font-bold text-sky-600 w-10">
                #{index + 1}
              </div>

              {/* 👤 CHARACTER INFO */}
              <div className="flex-1 ml-3">
                <div className="font-semibold text-sky-800">
                  {c.assignedName || c.name}
                </div>

                <div className="text-xs text-slate-500">{c.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
