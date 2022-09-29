export interface IBaseError extends Error {
  name: string;
  message: string;
  err?: unknown;
}