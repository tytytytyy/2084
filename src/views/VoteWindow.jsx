export default function VoteWindow({ voteId, setView }) {
  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold text-sky-700 mb-4">
        Abstimmung {voteId.replace("vote", "")}
      </h1>

      <p className="text-slate-500 mb-6">
        Hier kommt gleich das Dropdown / Voting rein.
      </p>

      <button
        onClick={() => setView("characters")}
        className="w-full bg-slate-300 p-3 rounded-xl"
      >
        Zurück
      </button>
    </div>
  );
}