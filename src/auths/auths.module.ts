import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { AuthsService } from './auths.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthsController } from './auths.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './helpers';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([Auth]),
  ],
  providers: [AuthsService, LocalStrategy],
  controllers: [AuthsController],
})
export class AuthsModule {}
