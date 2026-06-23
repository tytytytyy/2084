import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export function useCharacters() {
  const [characters, setCharacters] = useState([]);

  // 📥 LOAD + LIVE SYNC
  useEffect(() => {
    const q = query(
      collection(db, "characters"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCharacters(data);
    });

    return () => unsub();
  }, []);

  // 💾 SAVE
  const addCharacter = async (name, assignedName) => {
    await addDoc(collection(db, "characters"), {
      name,
      assignedName,
      createdAt: Date.now(),
    });
  };

  return { characters, addCharacter };
}