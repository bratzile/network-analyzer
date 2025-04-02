export class SpeedTestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SpeedTestError';
  }
}