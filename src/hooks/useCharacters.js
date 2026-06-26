import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  doc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";

export function useCharacters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "characters"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCharacters(data);
    });

    return () => unsub();
  }, []);

  const addCharacter = async (character) => {
    await addDoc(collection(db, "characters"), {
      name: String(character.name),
      assignedName: String(character.assignedName),
      score: Number(character.score) || 0,
      characterNumber: Number(character.characterNumber) || 0,
      imageUrl: String(character.imageUrl || ""),
      createdAt: Date.now(),
      socialScore: 0,
      votedRounds: [],
    });
  };

  const addSocialScoreToCharacter = async (characterId) => {
    if (!characterId) return;

    await updateDoc(doc(db, "characters", characterId), {
      socialScore: increment(1),
    });
  };

  const submitSocialVote = async ({ voterId, targetIds, roundId }) => {
    const voter = characters.find((c) => c.id === voterId);

    if (voter?.votedRounds?.includes(roundId)) {
      throw new Error("Du hast an diesem Abstimmungstag schon abgestimmt.");
    }

    for (const targetId of targetIds) {
      await updateDoc(doc(db, "characters", targetId), {
        socialScore: increment(1),
      });
    }

    await updateDoc(doc(db, "characters", voterId), {
      votedRounds: arrayUnion(roundId),
    });
  };

  return {
    characters,
    addCharacter,
    addSocialScoreToCharacter,
    submitSocialVote,
  };
}