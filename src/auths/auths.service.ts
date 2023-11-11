import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Auth, IPayload } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(Auth)
    private authsRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, password: string) {
    const auth = new Auth();
    auth.username = username;
    auth.password = await hash(password, 10);
    return this.authsRepository.save(auth);
  }

  async signIn(username: string, password: string) {
    const auth = await this.authsRepository.findOneBy({
      username,
    });
    if (!auth) return null;
    const isValidPassword = await compare(password, auth.password);
    return isValidPassword ? auth : null;
  }

  async getAccessToken(auth: Auth) {
    const payload: IPayload = { username: auth.username, sub: auth.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getAllAuths() {
    return this.authsRepository.find();
  }
}
