import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  getUserbyId(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Post()
  saveUser(@Body() newUser: CreateUserDto) {
    return this.usersService.saveUser(newUser);
  }

  @Patch(':userId')
  updateUser(@Param('userId') userId: string, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(userId, user);
  }

  @Delete(':userId')
  deleteUserById(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
