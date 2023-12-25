class RequestError extends Error {
  constructor(value: string) {
    super(`Request Error: ${JSON.stringify(value)}`);
  }
}

export default RequestError;