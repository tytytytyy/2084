export function getActiveVoteButton() {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1;
  const hour = now.getHours();



    // 30.07 ab 11 Uhr
  if (day === 26 && month === 6 && hour > 12) return "vote1";


  // 01.07 ab 12 Uhr
  if (day === 1 && month === 7 && hour >= 12) return "vote3";

  // 02.07 ganztägig
  if (day === 2 && month === 7) return "vote4";



/*   // 30.07 ab 11 Uhr
  if (day === 30 && month === 6 && hour >= 11) return "vote1";

  // 01.07 bis 12 Uhr
  if (day === 1 && month === 7 && hour < 12) return "vote2";

  // 01.07 ab 12 Uhr
  if (day === 1 && month === 7 && hour >= 12) return "vote3";

  // 02.07 ganztägig
  if (day === 2 && month === 7) return "vote4"; */

  return null;
}