import { useEffect, useState } from "react";

export async function fetchGoogleNames(sheetUrl) {
  try {
    const res = await fetch(sheetUrl);
    const text = await res.text();

    const rows = text
      .split("\n")
      .slice(2, 34); // 👈 ZEILE 3 bis 34 (Index 2–33)

    const names = rows
      .map(row => row.split(",")[1]) // 👈 Spalte "Name"
      .map(name => name?.trim())
      .filter(Boolean);

    console.log("NAMES (3–34):", names);

    return names;

  } catch (err) {
    console.error("Sheet error:", err);
    return [];
  }
}