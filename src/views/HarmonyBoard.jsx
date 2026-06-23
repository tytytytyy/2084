import { useCharacters } from "../hooks/useCharacters";

export default function HarmonyBoard() {
  const { characters } = useCharacters();

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-sky-700 mb-6">
        📊 Harmony Board
      </h1>

      <div className="space-y-3">

        {characters.map((c, index) => (
          <div
            key={c.id}
            className="p-4 bg-white border rounded-xl flex justify-between items-center"
          >

            {/* RANK */}
            <div className="text-lg font-bold text-sky-600">
              #{index + 1}
            </div>

            {/* NAME */}
            <div className="flex-1 ml-4">
              <div className="font-semibold">
                {c.assignedName}
              </div>
              <div className="text-xs text-gray-500">
                {c.name}
              </div>
            </div>

            {/* SCORE */}
            <div className="text-xl font-bold text-green-600">
              {c.score ?? 0}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}