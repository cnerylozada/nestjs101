import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  getUserById(id: string) {
    return this.usersRepository.findBy({ id: +id });
  }

  saveUser(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async updateUser(userId: string, user: UpdateUserDto) {
    const userToUpdate = await this.usersRepository.preload({
      id: +userId,
      ...user,
    });
    return this.usersRepository.save(userToUpdate);
  }

  async deleteUser(userId: string) {
    await this.usersRepository.delete({ id: +userId });
    return userId;
  }
}
