import { useEffect, useState } from "react";

export function useGoogleNames(url) {
  const [names, setNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const text = await res.text();

      const rows = text
        .split("\n")
        .map((r) => r.split(",")[0]) // erste Spalte = Name
        .filter(Boolean);

      setNames(rows);
    }

    fetchData();
  }, [url]);

  return names;
}