import RankingList from "../components/RankingList";

export default function HarmonyBoard() {
  const data = []; // später Firebase / Sheet

  return (
    <div className="p-4">
      <RankingList data={data} />
    </div>
  );
}