import { useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { useGoogleNames } from "../hooks/useGoogleNames";
import { getRandomItem } from "../utils/random";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1bcxjaasmrBsTm7rYnJAT7wPX6_HO-dM79GY3pF1cps8/export?format=csv";

export default function CharacterCreate({ setView }) {
  const { addCharacter } = useCharacters();
  const names = useGoogleNames(SHEET_URL);

  const [input, setInput] = useState("");

  const handleCreate = async () => {
    if (!input || names.length === 0) return;

    // 🎲 random Google Sheet Name
    const randomName = getRandomItem(names);

    // 💾 Firebase speichern (VERKNÜPFUNG)
    await addCharacter(input, randomName);

    setView("characters");
  };

  return (
    <div className="p-6 max-w-md mx-auto">

      <h1 className="text-2xl font-bold text-sky-700 mb-4">
        Create Character
      </h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 border rounded-xl mb-3"
        placeholder="Dein Name"
      />

      <button
        onClick={handleCreate}
        className="w-full bg-sky-500 text-white p-3 rounded-xl"
      >
        🎲 Charakter erstellen
      </button>

    </div>
  );
}