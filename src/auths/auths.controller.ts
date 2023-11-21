import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateUserDto } from 'src/users/users.dto';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Controller('auths')
export class AuthsController {
  constructor(private authsService: AuthsService) {}

  @Post('sign-up')
  async signUp(@Body() credentials: CreateUserDto) {
    return this.authsService.signUp(credentials);
  }

  @Post('sign-in')
  async login(@Body() credentials: CreateUserDto) {
    return this.authsService.signIn(credentials);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authsService.refreshTokens(userId, refreshToken);
  }
}
