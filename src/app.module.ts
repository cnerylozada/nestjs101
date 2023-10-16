import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './typeorm.config';
import { UsersModule } from './users/users.module';
import { CoffeeHouseModule } from './coffee-house/coffee-house.module';
import { AuthsModule } from './auths/auths.module';
import { S3Module } from './s3/s3.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    CoffeeHouseModule,
    AuthsModule,
    S3Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
