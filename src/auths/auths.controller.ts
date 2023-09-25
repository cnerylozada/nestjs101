import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auths')
export class AuthsController {
  constructor(private authsService: AuthsService) {}

  @Post('sign-up')
  async signUp(@Body() userInfo: { username: string; password: string }) {
    return this.authsService.signUp(userInfo.username, userInfo.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Request() req) {
    return this.authsService.getAccessToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllAuths() {
    return this.authsService.getAllAuths();
  }
}
