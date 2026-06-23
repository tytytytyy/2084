import { useState } from "react";

import { useCharacters } from "./hooks/useCharacters";
import { useGoogleNames } from "./hooks/useGoogleNames";

import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";

import Characters from "./views/Characters";
import CharacterCreate from "./views/CharacterCreate";
import HarmonyBoard from "./views/HarmonyBoard";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1bcxjaasmrBsTm7rYnJAT7wPX6_HO-dM79GY3pF1cps8/export?format=csv";

export default function App() {
  const [view, setView] = useState("characters");

  //Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { characters } = useCharacters();



  return (

    
    <div className="flex min-h-screen">
      {/* SIDEBAR */}

      <Sidebar characters={characters} setView={setView} open={sidebarOpen}/>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-50 text-2xl"
      >
        ☰
      </button>
  

      {/* MAIN CONTENT */}
      <div className="flex-1">
        {view === "characters" && <Characters setView={setView} />}

        {view === "create" && <CharacterCreate setView={setView} />}

        {view === "harmony" && <HarmonyBoard setView={setView} />}
      </div>

      {/* 🔥 ALWAYS VISIBLE */}
      <div className="flex min-h-screen">
        <BottomNav view={view} setView={setView} />
      </div>


    {/* 🔥 HIER IST DAS OVERLAY */}
    {sidebarOpen && (
      <div
        onClick={() => setSidebarOpen(false)}
        className="fixed inset-0 bg-black/30 z-30"
      />
    )}
    </div>
  );
}
