class AuthError extends Error {
  constructor(value: string) {
    super(`AuthError: ${JSON.stringify(value)}`);
  }
}

export default AuthError;
