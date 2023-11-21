import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/auths/guards/accessToken.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  findAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get('username/:userName')
  getUserByUsername(@Param('userName') userName: string) {
    return this.usersService.getUserByUsername(userName);
  }

  @Delete(':userId')
  deleteUserById(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
