import { Controller, Post, Body } from '@nestjs/common';
import { AuthsService } from './auths.service';

@Controller('auths')
export class AuthsController {
  constructor(private authsService: AuthsService) {}

  @Post('sign-in')
  signIn(@Body() userCredentials: { email: string; password: string }) {
    return this.authsService.signIn(
      userCredentials.email,
      userCredentials.password,
    );
  }

  @Post('sign-up')
  signUp(@Body() userCredentials: { email: string; password: string }) {
    return this.authsService.signUp(
      userCredentials.email,
      userCredentials.password,
    );
  }
}
