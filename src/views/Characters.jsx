import Sidebar from "../components/Sidebar";
import { useCharacters } from "../hooks/useCharacters";

export default function Characters({ setView }) {
  const { characters } = useCharacters();

  return (
    <div className="flex">

      {/* MAIN AREA */}
      <div className="flex-1 p-6">
        <h1 className="text-center text-2xl font-bold text-sky-700">
          Characters
        </h1>
      </div>

    </div>
  );
}