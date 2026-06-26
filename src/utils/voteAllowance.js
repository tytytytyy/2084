export function getVoteAllowance(selectedCharacter, characters) {
  if (!selectedCharacter) return 0;

  const sorted = [...characters].sort(
    (a, b) => (b.score ?? 0) - (a.score ?? 0)
  );

  const index = sorted.findIndex((c) => c.id === selectedCharacter.id);
  if (index === -1) return 0;

  const third = Math.ceil(sorted.length / 3);

  if (index < third) return 2;
  if (index < third * 2) return 1;
  return 0;
}