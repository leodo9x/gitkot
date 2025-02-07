export class RateLimitExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitExceededError';
  }
}

export class OnlyFirst1000ResultsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OnlyFirst1000ResultsError';
  }
}

export class InvalidTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTokenError';
  }
}
