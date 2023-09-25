import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auths/local-auth.guard';
import { AuthsService } from './auths.service';

@Controller('auths')
export class AuthsController {
  constructor(private authsService: AuthsService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Request() req) {
    return req.user;
  }

  @Post('sign-up')
  async signUp(@Body() userInfo: { username: string; password: string }) {
    return this.authsService.signUp(userInfo.username, userInfo.password);
  }
}
