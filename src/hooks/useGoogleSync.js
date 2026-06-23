import { useEffect } from "react";
import { db } from "../services/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export function useGoogleSync(sheetUrl, intervalMs = 180000) {
  useEffect(() => {
    if (!sheetUrl) return;

    let running = false;

    const sync = async () => {
      if (running) return;
      running = true;

      try {
        const res = await fetch(sheetUrl);
        const text = await res.text();

        const rows = text
          .split("\n")
          .slice(2, 34)
          .map((r) => r.split(","));

        const sheetData = rows.map((r) => ({
          name: String(r[1] || "").trim(),
          score: Number(r[13]) || 0,
        }));

        
        const snap = await getDocs(collection(db, "characters"));

        snap.forEach(async (d) => {
          const char = d.data();

          const match = sheetData.find(
            (s) => s.name === char.assignedName
          );

          if (match) {
            await updateDoc(doc(db, "characters", d.id), {
              assignedName: String(match.name),
              name: String(char.name || ""),
              score: Number(match.score) || 0,
            });
          }
        });

      } catch (err) {
        console.error(err);
      }

      running = false;
    };

    sync();
    const id = setInterval(sync, intervalMs);

    return () => clearInterval(id);
  }, [sheetUrl, intervalMs]);
}