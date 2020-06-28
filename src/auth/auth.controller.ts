import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from 'src/user/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator';



@ApiTags('用户认证')
@Controller('auth')
export class AuthController {
  // 注入 用户模型
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>
  ) {  }


  @Post('register')
  @ApiOperation({summary: '注册'})
  async register(@Body() dto: RegisterDto) {
    const {username, password} = dto
    const user = await this.userModel.create({
      username, password
    })
    return user
  }

  @Post('login')
  @ApiOperation({summary: '登录'})
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument) {
    return {
      token: this.jwtService.sign(String(user._id))
    }
  }

  @Get('user')
  @ApiOperation({summary: '获取信息'})
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async user(@CurrentUser() user: UserDocument) {
    return user
  }

}
