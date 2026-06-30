export function getActiveVoteButton() {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1;
  const hour = now.getHours();

// 01.07. bis 10:59 Uhr
if (day === 1 && month === 7 && hour < 11) return "vote1";

// 01.07. ab 11:00 Uhr
if (day === 1 && month === 7 && hour >= 11) return "vote2";

// 02.07.
if (day === 2 && month === 7) return "vote3";

  return null;
}