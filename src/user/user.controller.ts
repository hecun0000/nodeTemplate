import { Controller, Get, Post, Body, Delete, Put, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { IsNotEmpty } from 'class-validator'
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

class UserInfo {
  @ApiProperty({title: '用户名', example: 'hecun'})
  @IsNotEmpty({message: '请填写用户名'})
  name: string
}

@Controller('user')
@ApiTags('用户中心')
export class UserController {

  constructor(@InjectModel(User) private readonly UserModel: ModelType<User>){}

  @Get()
  @ApiOperation({ summary: '用户列表' })
  async index() {
    return await this.UserModel.find()
  }

  @Post()
  @ApiOperation({ summary: '创建用户' ,description: '创建用户接口'})
  async create(@Body() userInfo: UserInfo) {
    await this.UserModel.create(userInfo)
    return {
      success: true,
      userInfo
    }
  }

  
  @Put(':id')
  @ApiOperation({ summary: '编辑用户' ,description: '编辑用户接口'})
  async update(@Param('id') id: string, @Body() userInfo: UserInfo) {
    await this.UserModel.findByIdAndUpdate(id, userInfo)
    return {
      success: true,
      userInfo,
      id
    }
  }


  @Get(':id')
  @ApiOperation({ summary: '查询用户', description: '查询用户接口' })
  async detail(@Param('id') id: string) {
    return await this.UserModel.findById(id)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户', description: '删除用户接口' })
  async remove(@Param('id') id: string) {
    await this.UserModel.findByIdAndDelete(id)
    return {
      id,
      success: true
    }
  }

}
