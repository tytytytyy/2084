import { useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { getActiveVoteButton } from "../utils/voteButtonTime";
import { getVoteAllowance } from "../utils/voteAllowance";

export default function Characters({
  selectedCharacter,
}) {
  const { characters, submitSocialVote } = useCharacters();

  const activeVoteButton = getActiveVoteButton();

  const [openVotePopup, setOpenVotePopup] = useState(null);
  const [voteTarget1, setVoteTarget1] = useState("");
  const [voteTarget2, setVoteTarget2] = useState("");

  const voteAllowance = getVoteAllowance(selectedCharacter, characters);
  const voteTargets = characters.filter((c) => c.id !== selectedCharacter?.id);

  const alreadyVoted =
    selectedCharacter?.votedRounds?.includes(openVotePopup);

  const handleSubmitVote = async () => {
    const selectedVotes = [voteTarget1, voteTarget2].filter(Boolean);

    if (selectedVotes.length === 0) return;

    try {
      await submitSocialVote({
        voterId: selectedCharacter.id,
        targetIds: selectedVotes,
        roundId: openVotePopup,
      });

      setVoteTarget1("");
      setVoteTarget2("");
      setOpenVotePopup(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h1 className="text-center text-2xl font-bold text-sky-700">
          Mein Charakter
        </h1>

        {!selectedCharacter ? (
          <p className="text-center text-slate-400 mt-4">
            Wähle einen Charakter aus
          </p>
        ) : (
          <div className="mt-6 text-center">
            {selectedCharacter.imageUrl && (
              <img
                src={selectedCharacter.imageUrl}
                alt={selectedCharacter.assignedName}
                className="w-100 object-cover mx-auto mb-4 shadow-md"
              />
            )}

            <h2 className="text-xl font-semibold">
              {selectedCharacter.assignedName}
            </h2>

            <p className="text-slate-500">{selectedCharacter.name}</p>

            <div className="mt-6 grid gap-3">
              {["vote1", "vote2", "vote3"].map((vote, index) => (
                <button
                  key={vote}
                  disabled={activeVoteButton !== vote}
                  onClick={() => {
                    setVoteTarget1("");
                    setVoteTarget2("");
                    setOpenVotePopup(vote);
                  }}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                    activeVoteButton === vote
                      ? "bg-sky-400 hover:bg-sky-500 text-white shadow-md cursor-pointer"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Abstimmung Tag {index + 2}
                </button>
              ))}

              {openVotePopup && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
                  <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
                    <h2 className="text-2xl text-center font-bold text-sky-700 mb-6">
                      Abstimmung {openVotePopup.replace("vote", "")}
                    </h2>

                    {alreadyVoted ? (
                      <div className="bg-green-50 rounded-2xl p-6">
                        <p className="text-center text-green-700 font-semibold">
                          Du hast an diesem Abstimmungstag schon abgestimmt.
                        </p>
                      </div>
                    ) : voteAllowance === 0 ? (
                      <div className="bg-slate-100 rounded-2xl p-6">
                        <p className="text-center text-slate-600 font-semibold">
                          Du bist ein Gamma und hast keine Wahlstimme bei der Abstimmung
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <p className="text-center text-slate-600 font-semibold">
                          Du bist ein Beta und hast eine Wahlstimme bei der Abstimmung.
                        </p>

                        <select
                          value={voteTarget1}
                          onChange={(e) => setVoteTarget1(e.target.value)}
                          className="w-full p-4 border border-sky-200 rounded-2xl bg-sky-50"
                        >
                          <option value="">Spieler wählen</option>
                          {voteTargets.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.assignedName}
                            </option>
                          ))}
                        </select>

                        {voteAllowance === 2 && (
                          <select
                            value={voteTarget2}
                            onChange={(e) => setVoteTarget2(e.target.value)}
                            className="w-full p-4 border border-sky-200 rounded-2xl bg-sky-50"
                          >
                            <option value="">Zweiten Spieler wählen</option>
                            {voteTargets.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.assignedName}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}

                    {!alreadyVoted && voteAllowance > 0 && (
                      <button
                        onClick={handleSubmitVote}
                        disabled={!voteTarget1 && !voteTarget2}
                        className="mt-6 w-full bg-green-500 text-white p-3 rounded-2xl font-semibold disabled:opacity-40"
                      >
                        Abstimmen
                      </button>
                    )}

                    <button
                      onClick={() => setOpenVotePopup(null)}
                      className="mt-8 w-full bg-sky-500 text-white p-3 rounded-2xl font-semibold hover:bg-sky-600 transition"
                    >
                      Schließen
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}