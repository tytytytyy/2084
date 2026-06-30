import { db } from "../services/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

export function useVotes() {
  const submitVote = async ({
    roundId,
    voterId,
    targetIds,
    pointsPerVote,
  }) => {
    const voteId = `${roundId}_${voterId}`;
    const voteRef = doc(db, "votes", voteId);

    const existingVote = await getDoc(voteRef);

    if (existingVote.exists()) {
      throw new Error("Du hast in dieser Runde schon abgestimmt.");
    }

    await setDoc(voteRef, {
      roundId,
      voterId,
      targetIds,
      pointsPerVote,
      createdAt: Date.now(),
    });

    for (const targetId of targetIds) {
      await updateDoc(doc(db, "characters", targetId), {
        score: increment(pointsPerVote),
      });
    }
  };

  return { submitVote };
}