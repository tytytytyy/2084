import { useEffect, useState } from "react";
import { db } from "./services/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

export function useCharacters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "characters"), (snap) => {
      setCharacters(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
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
    });
  };

  return { characters, addCharacter };
}