export interface ErrorConverter {
  toMessage(error: unknown): string;
}
