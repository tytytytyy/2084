import { useState } from "react";

import { useCharacters } from "./hooks/useCharacters";
import { useGoogleSync } from "./hooks/useGoogleSync";

import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";

import StartScreen from "./components/StartScreen";
import Characters from "./views/Characters";
import CharacterCreate from "./views/CharacterCreate";
import HarmonyBoard from "./views/HarmonyBoard";

import { SHEET_URL } from "./config";

export default function App() {
  const [view, setView] = useState("start");

  //Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  //Ausgewählter Charakter
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const { characters } = useCharacters();

  useGoogleSync(SHEET_URL, 180000); // alle 3 Minuten

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} />}

      <Sidebar
        characters={characters}
        setView={setView}
        open={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
        onSelectCharacter={(character) => {
          setSelectedCharacter(character);
          setView("characters");
          setSidebarOpen(false);
        }}
      />
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="fixed top-4 left-4 z-50 text-2xl"
      >
        ☰
      </button>

      {/* MAIN CONTENT */}
<div className="flex-1 pb-10 overflow-y-auto">
          {view === "start" && <StartScreen setView={setView} />}

        {view === "characters" && (
          <Characters selectedCharacter={selectedCharacter} />
        )}
        {view === "create" && <CharacterCreate setView={setView} setSelectedCharacter={setSelectedCharacter} />}

        {view === "harmony" && <HarmonyBoard setView={setView} />}
      </div>

      {/* 🔥 ALWAYS VISIBLE */}
      <div className="flex min-h-screen">
        <BottomNav view={view} setView={setView} />
      </div>
    </div>
  );
}
