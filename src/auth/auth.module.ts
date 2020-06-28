import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from './local.strategy';
import { User } from 'src/user/user.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy]
})
export class AuthModule {}
