import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from './models';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthsService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, password: string) {
    // const auth = new User();
    // auth.username = username;
    // auth.password = await hash(password, 10);
    // return this.usersService.save(auth);
  }

  async signIn(username: string, password: string) {
    // const auth = await this.authsRepository.findOneBy({
    //   username,
    // });
    // if (!auth) return null;
    // const isValidPassword = await compare(password, auth.password);
    // return isValidPassword ? auth : null;
  }

  async getAccessToken(auth: User) {
    // const payload: IPayload = { username: auth.username, sub: auth.id };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }
}
