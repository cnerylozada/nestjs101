import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(Auth)
    private authsRepository: Repository<Auth>,
  ) {}

  async signIn(username: string, password: string) {
    const auth = await this.authsRepository.findOneBy({
      username,
    });
    if (!auth) return null;
    const isValidPassword = await compare(password, auth.password);
    return isValidPassword ? 'token' : null;
  }

  async signUp(username: string, password: string) {
    const auth = new Auth();
    auth.username = username;
    auth.password = await hash(password, 10);
    return this.authsRepository.save(auth);
  }
}
