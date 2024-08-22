export class UserAlreadyExistsError extends Error {
  constructor() {
    super('This user already exists');
  }
}
