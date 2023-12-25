class AuthError extends Error {
  constructor(value: string) {
    super(`Auth Error: ${JSON.stringify(value)}`);
  }
}

export default AuthError;
