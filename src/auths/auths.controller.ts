import { Controller, Request, Post, Body } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateUserDto } from 'src/users/users.dto';

@Controller('auths')
export class AuthsController {
  constructor(private authsService: AuthsService) {}

  @Post('sign-up')
  async signUp(@Body() credentials: CreateUserDto) {
    return this.authsService.signUp(credentials);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Body() credentials: CreateUserDto) {
    return this.authsService.signIn(credentials);
  }
}
