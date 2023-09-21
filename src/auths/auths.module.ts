import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  providers: [AuthsService],
  controllers: [AuthsController],
})
export class AuthsModule {}
