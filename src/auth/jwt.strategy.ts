import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";
import { PassportStrategy } from '@nestjs/passport'
import { User } from '../user/user.model';
import { StrategyOptions, Strategy, ExtractJwt } from "passport-Jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User) private userModel: ReturnModelType<typeof User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'fdsfjdsfgjhkdsfhkgdshgkjfgh'
    } as StrategyOptions)
  }

  async validate(id) {
    return this.userModel.findById(id)
  }

}