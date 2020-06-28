import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { PassportStrategy } from '@nestjs/passport'
import { User } from '../user/user.model';
import { IStrategyOptions, Strategy } from "passport-local";
import { BadRequestException } from "@nestjs/common";
import { compareSync } from "bcryptjs";

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User) private userModel: ReturnModelType<typeof User>) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    } as IStrategyOptions)
  }

  async validate(username, password) {
    const user = await await this.userModel.findOne({username}).select('+password')

    if(!user) {
      throw new BadRequestException('用户名不正确')
    }

    if(!compareSync(password, user.password)) {
      throw new BadRequestException('密码不正确')
    }

    return user
  }

}