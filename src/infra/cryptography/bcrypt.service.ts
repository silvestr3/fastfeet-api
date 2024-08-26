import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { HashComparer } from '@/domain/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/application/cryptography/hash-generator';

@Injectable()
export class BcryptService implements HashComparer, HashGenerator {
  async hash(plain: string): Promise<string> {
    const ROUNDS = 8;

    return await hash(plain, ROUNDS);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return await compare(plain, hashed);
  }
}
