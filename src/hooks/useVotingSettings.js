import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export function useVotingSettings() {
  const [voting, setVoting] = useState({
    enabled: false,
    roundId: "round1",
    pointsPerVote: 5,
    startAt: null,
    endAt: null,
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "voting"), (snap) => {
      if (snap.exists()) {
        setVoting(snap.data());
      }
    });

    return () => unsub();
  }, []);

  return voting;
}