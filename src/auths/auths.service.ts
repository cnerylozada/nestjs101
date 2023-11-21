import { BadRequestException, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/users.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthsService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getTokens(userId: number, username: string) {
    console.log('service', this.configService.get('secrets.token'));
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, username },
      { secret: this.configService.get('secrets.token'), expiresIn: '1m' },
    );
    const refreshToken = await this.jwtService.signAsync(
      { sub: userId, username },
      { secret: this.configService.get('secrets.refresh'), expiresIn: '2m' },
    );
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    return this.usersService.updateUser(`${userId}`, {
      refreshToken: hashedRefreshToken,
    });
  }

  async signUp(credentials: CreateUserDto) {
    const { password, username } = credentials;
    const hashedPassword = await hash(password, 10);
    const { id } = await this.usersService.saveUser({
      username,
      password: hashedPassword,
    });
    const tokens = await this.getTokens(id, username);
    await this.updateRefreshToken(id, tokens.refreshToken);
    return tokens;
  }

  async signIn(credentials: CreateUserDto) {
    const { username, password } = credentials;
    const [user] = await this.usersService.getUserByUsername(username);
    if (!user) throw new BadRequestException('User not found');
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
