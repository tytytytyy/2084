import { useGoogleSheet } from "./hooks/useGoogleSheet";
import RankingList from "./components/RankingList";

export default function App() {
  const { data } = useGoogleSheet();

  // 🏆 nach Score sortieren (höchster zuerst)
  const sorted = [...data]
    .sort((a, b) => b.score - a.score)
    .map((p, index) => ({
      ...p,
      rank: index + 1,
    }));

  return <RankingList data={sorted} />;
}