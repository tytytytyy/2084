export default function BottomNav({ view, setView }) {
  const btn = (name, label) => (
    <button
      onClick={() => setView(name)}
      className={`
        flex-1 py-3 font-bold transition
        ${
          view === name
            ? "text-sky-700 bg-sky-100"
            : "text-slate-500"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white flex">
      {btn("harmony", "📊 Harmonyboard")}
      {btn("characters", "👤 Mein Charakter")}
    </div>
  );
}