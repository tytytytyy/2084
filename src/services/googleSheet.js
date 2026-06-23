export async function fetchSheetData(sheetUrl) {
  const res = await fetch(sheetUrl);
  const text = await res.text();

  const rows = text
    .split("\n")
    .slice(2, 34)
    .map((r) => r.split(","));

  return rows.map((r) => ({
    name: String(r[1] || "").trim(),
    score: Number(r[2]) || 0,
  }));
}