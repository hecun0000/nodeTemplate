import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypegooseModule } from "nestjs-typegoose";
import { CrudModule } from './crud/crud.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost:27017/test",
      { useNewUrlParser: true }
    ),
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: 'fdsfjdsfgjhkdsfhkgdshgkjfgh'
        }
      }
    }),
    UserModule,
    CrudModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule]
})
export class AppModule { }
