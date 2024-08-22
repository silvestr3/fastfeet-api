import { HashComparer } from 'src/domain/application/cryptography/hash-comparer';
import { HashGenerator } from 'src/domain/application/cryptography/hash-generator';

export class FakeHasher implements HashComparer, HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return plain.concat('-hashed') === hashed;
  }
}
