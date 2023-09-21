import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(Auth)
    private authsRepository: Repository<Auth>,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.authsRepository.findOneBy({ email });
    if (!!user) {
      const isValidPassword = await compare(password, user.password);
      if (isValidPassword) {
        return 'token';
      }
    }
    return 'user not found';
  }

  async signUp(email: string, password: string) {
    const user = new Auth();
    user.email = email;
    user.password = await hash(password, 10);
    return this.authsRepository.save(user);
  }
}
