export class KeyValidationException extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'KeyValidationException';
    }
  }
  
  export class RateLimitExceededException extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'RateLimitExceededException';
    }
  }
  