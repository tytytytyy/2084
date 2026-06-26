import { useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { fetchSheetData } from "../services/googleSheet";
import { characterImages } from "../utils/characterImg";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1bcxjaasmrBsTm7rYnJAT7wPX6_HO-dM79GY3pF1cps8/export?format=csv";

export default function CharacterCreate({ setView }) {
  const { characters, addCharacter } = useCharacters();
  const [input, setInput] = useState("");

  const handleCreate = async () => {
    if (!input) return;

    // 📊 Sheet laden
    const sheetData = await fetchSheetData(SHEET_URL);
    if (!sheetData.length) return;

    // 🔢 Freie Nummer (1-36) ziehen, die noch nicht vergeben ist
    const usedNumbers = characters.map((c) => c.characterNumber);
    const allNumbers = characterImages.map((img) => img.id);
    const availableNumbers = allNumbers.filter(
      (num) => !usedNumbers.includes(num)
    );

    if (availableNumbers.length === 0) {
      alert("Alle 36 Nummern sind bereits vergeben!");
      return;
    }

    const randomNumber =
      availableNumbers[Math.floor(Math.random() * availableNumbers.length)];

    // 🎯 EINE Nummer bestimmt sowohl Sheet-Eintrag als auch Bild
    const matchedCharacter = sheetData[randomNumber - 1]; // Index = Nummer - 1
    const matchedImage = characterImages.find((img) => img.id === randomNumber);

    if (!matchedCharacter || !matchedImage) {
      alert("Fehler bei der Zuordnung — bitte erneut versuchen.");
      return;
    }

    // 💾 Firebase speichern
    await addCharacter({
      name: input, // User Name
      assignedName: String(matchedCharacter.name), // Sheet Name an gleicher Position
      score: Number(matchedCharacter.score) || 0, // Sheet Score an gleicher Position
      characterNumber: randomNumber, // 👈 die EINE feste Nummer
      imageUrl: matchedImage.url, // 👈 Bild mit gleicher Nummer
    });

  
    setView("characters");
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
        🎲 Charakter erstellen
      </button>
    </div>
  );
}