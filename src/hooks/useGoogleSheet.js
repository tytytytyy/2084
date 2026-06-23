import { useEffect, useState } from "react";

export async function fetchGoogleNames(sheetUrl) {
  try {
    const res = await fetch(sheetUrl);
    const text = await res.text();

    const rows = text.split("\n");

    return rows
      .map((row) => row.split(",")[1]) // zweite Spalte = Name
      .filter(Boolean)
      .map((name) => name.trim());
  } catch (err) {
    console.error("Google Sheets error:", err);
    return [];
  }
}