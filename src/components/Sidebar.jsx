export default function Sidebar({
  characters,
  setView,
  open,
  onSelectCharacter,
  closeSidebar
}) {
  return (
    <div
      className={`
    fixed top-0 bottom-0 left-0 w-72
    bg-sky-50 border-r p-4 flex flex-col
    transform transition-transform duration-300 z-40
    ${open ? "translate-x-0" : "-translate-x-full"}
  `}
    >
      {/* HEADER */}
      <div className="pt-14 pb-3">
        <h2 className="text-xl font-bold text-sky-700">Charaktere</h2>
      </div>
      {/* LIST (scroll only if needed) */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {characters.length === 0 && (
          <p className="text-sm text-slate-400">Keine Charaktere</p>
        )}

        {characters.map((c) => (
          <div
            key={c.id}
            onClick={() => {
              onSelectCharacter?.(c);
              closeSidebar();
            }}
            className="p-3 bg-white border rounded-xl cursor-pointer hover:bg-sky-100 transition"
          >
            <div className="font-semibold text-sky-800">{c.assignedName}</div>
            <div className="text-xs text-slate-500">{c.name}</div>
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={() => {
          setView("create");
          closeSidebar();
        }}
        className="mt-4 w-full bg-sky-500 text-white p-3 rounded-xl"
      >
        ➕ Charakter erstellen
      </button>
    </div>
  );
}
