export default function StartScreen({ setView }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-sky-100 px-6">
      
      {/* Logo / Titel */}
      <img
        src="/logo.png"
        alt="Harmony"
        className="w-100 h-100 object-contain mb-6"
      />

      <p className="text-slate-600 mb-8 text-center max-w-sm">
        Willkommen. Wähle deinen Charakter aus und leg los.
      </p>

      {/* Start Button */}
      <button
        onClick={() => setView("characters")}
        className="bg-sky-500 text-white px-6 py-3 rounded-2xl shadow-md"
      >
        Start
      </button>
    </div>
  );
}