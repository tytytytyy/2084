import { useEffect, useState } from "react";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/1bcxjaasmrBsTm7rYnJAT7wPX6_HO-dM79GY3pF1cps8/export?format=csv";

export function useGoogleSheet() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

const parseCSV = (text) => {
  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  // ❌ erste 2 Zeilen sind Header + Subheader
  const dataLines = lines.slice(2);

  return dataLines.map((line) => {
    const cols = line.split(",").map(c => c.trim());

    return {
      rank: Number(cols[0]),
      name: cols[1],
      real: cols[2],
      age: Number(cols[3]),

      year1: cols[4],
      year2: cols[5],
      year3: cols[6],
      year4: cols[7],

      score: Number(cols[cols.length - 1]),
    };
  }).filter(p => p.name);
};

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(CSV_URL + "&t=" + Date.now());
      const text = await res.text();
console.log("RAW CSV:");
console.log(text);
      setData(parseCSV(text));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, refresh: fetchData };
}