
function randomInt(max, min = 0) {
  return Math.floor(Math.random() * max) + min;
}

export function getNextQuestion() {
  const a = randomInt(10);
  const b = randomInt(10);
  return {
    a,
    b,
    op: '+',
    ans: a + b
  };
}