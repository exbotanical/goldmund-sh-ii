export abstract class SystemError extends Error {
  abstract statusCode: number;

  constructor (message: string) {
    super(message);

    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work 
    Object.setPrototypeOf(this, SystemError.prototype);
  }

  abstract serialize (): { message: String, field?: string }[];
}