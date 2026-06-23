import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

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

  const addCharacter = async (name, assignedName) => {
    await addDoc(collection(db, "characters"), {
      name,
      assignedName,
      createdAt: Date.now(),
    });
  };

  return { characters, addCharacter };
}