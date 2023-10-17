class UnvalidValueError extends Error {
  constructor(value: string) {
    super(`Unvalid value: ${JSON.stringify(value)}`);
  }
}

export default UnvalidValueError;
