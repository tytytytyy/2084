import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useCharacters } from "../hooks/useCharacters";

export default function Characters({ selectedCharacter }) {
  const { characters } = useCharacters();

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="flex">
      {/* MAIN AREA */}
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
          </div>
        )}
      </div>
    </div>
  );
}
