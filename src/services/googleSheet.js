export async function fetchSheetData(sheetUrl) {
  try {
    const res = await fetch(sheetUrl);
    const text = await res.text();

    const rows = text
      .split("\n")
      .slice(2, 34)
      .map((row) => row.split(","));

    console.log("RAW ROWS:", rows);


    const parsed = rows
      .map((r) => ({
        number: String(r[0] || "").trim(), // Nr.-Spalte
        name: String(r[1] || "").trim(), // Name-Spalte
        score: Number(r[2]) || 0, // Score-Spalte
      }))
      .filter((r) => r.name); // leere raus

    console.log("PARSED SHEET:", parsed);

    return parsed;
  } catch (err) {
    console.error("SHEET ERROR:", err);
    return [];
  }
}