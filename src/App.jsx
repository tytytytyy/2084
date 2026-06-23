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

  const { characters } = useCharacters();

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR ALWAYS */}
      <Sidebar
        characters={characters}
        setView={setView}
      />
      {/* MAIN CONTENT */}
      <div className="flex-1">

        {view === "characters" && (
          <Characters setView={setView} />
        )}

        {view === "create" && (
          <CharacterCreate setView={setView} />
        )}

        {view === "harmony" && (
          <HarmonyBoard setView={setView} />
        )}

      </div>

      {/* 🔥 ALWAYS VISIBLE */}
      <BottomNav view={view} setView={setView} />


    </div>
  );
}