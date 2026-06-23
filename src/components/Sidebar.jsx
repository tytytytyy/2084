export default function Sidebar({ characters, setView }) {
  return (
    <div className="w-72 h-screen bg-sky-50 border-r p-4 flex flex-col">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-sky-700 mb-4">
        👤 Characters
      </h2>

      {/* LIST FROM FIREBASE */}
      <div className="flex-1 overflow-y-auto space-y-2">

        {characters.length === 0 && (
          <p className="text-sm text-slate-400">
            Keine Charaktere
          </p>
        )}

        {characters.map((c) => (
          <div
            key={c.id}
            className="p-3 bg-white border rounded-xl"
          >
            <div className="font-semibold text-sky-800">
              {c.name}
            </div>

            <div className="text-xs text-slate-500">
              🎲 {c.assignedName}
            </div>
          </div>
        ))}

      </div>

      {/* BUTTON BOTTOM */}
      <button
        onClick={() => setView("create")}
        className="mt-4 w-full bg-sky-500 text-white p-3 rounded-xl"
      >
        ➕ Charakter erstellen
      </button>

    </div>
  );
}