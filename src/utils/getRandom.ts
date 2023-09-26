function numberInRange(start: number, end: number): number {
  const range = end - start;

  if (range <= 0) {
    throw new Error(`randNumberInRange error: "end" <= "start", range = ${range}`);
  }
  return Math.floor(Math.random() * (range + 1)) + start;
}

const getRandom = {
  numberInRange,
};

export default getRandom;
