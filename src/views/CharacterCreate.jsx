import { useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { fetchSheetData } from "../services/googleSheet";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1bcxjaasmrBsTm7rYnJAT7wPX6_HO-dM79GY3pF1cps8/export?format=csv";

export default function CharacterCreate({ setView, setSelectedCharacter }) {
  const { characters, addCharacter } = useCharacters();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!input || isLoading) return;

    setIsLoading(true);

    try {
      // 📊 Sheet laden
      const sheetData = await fetchSheetData(SHEET_URL);
      if (!sheetData.length) return;

      // Bereits verwendete Tabellen-Nummern
      const usedNumbers = characters.map((c) => Number(c.characterNumber));

      // Nur freie Charaktere aus dem Sheet
      const availableCharacters = sheetData.filter(
        (c) => !usedNumbers.includes(Number(c.number)),
      );

      if (availableCharacters.length === 0) {
        alert("Alle Charaktere wurden bereits vergeben!");
        return;
      }

      // Zufälligen Charakter aus dem Sheet wählen
      const matchedCharacter =
        availableCharacters[
          Math.floor(Math.random() * availableCharacters.length)
        ];

      // 💾 Firebase speichern
      const newCharacter = {
        name: input,
        characterNumber: Number(matchedCharacter.number),
        assignedName: String(matchedCharacter.name),
        score: Number(matchedCharacter.score) || 0,
        imageUrl: `/${matchedCharacter.number}.jpg`,
      };

      await addCharacter(newCharacter);

      setSelectedCharacter(newCharacter);
      setView("characters");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-sky-700 mb-4">
        Erstelle einen Charakter
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
        {isLoading ? "Wird erstellt..." : "🎲 Charakter erstellen"}
      </button>
    </div>
  );
}
