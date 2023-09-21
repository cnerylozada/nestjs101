import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './typeorm.config';
import { UsersModule } from './users/users.module';
import { CoffeeHouseModule } from './coffee-house/coffee-house.module';
import { AuthsModule } from './auths/auths.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    CoffeeHouseModule,
    AuthsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
