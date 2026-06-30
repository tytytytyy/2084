export function getActiveVoteButton() {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1;
  const hour = now.getHours();


  // 1.07 bis 11 Uhr
  if (day === 1 && month === 7 && hour <= 11) return "vote1";

  // 01.07 ab 11 12 Uhr
  if (day === 1 && month === 7 && hour > 11) return "vote2";

  // 01.07 ab 12 Uhr
  if (day === 2 && month === 7 && hour >= 14) return "vote3";

  return null;
}