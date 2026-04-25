export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  success(message: string): void;
  error(message: string): void;
}

export function createLogger(): Logger {
  return {
    info: (message) => console.log(message),
    warn: (message) => console.warn(message),
    success: (message) => console.log(message),
    error: (message) => console.error(message)
  };
}
