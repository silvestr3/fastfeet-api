import { randomUUID } from 'node:crypto';

export class UniqueEntityId {
  public value: string;

  public toString() {
    return this.value;
  }

  constructor(id?: string) {
    this.value = id ?? randomUUID();
  }
}
