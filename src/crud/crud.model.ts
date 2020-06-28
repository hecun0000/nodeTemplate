import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class Curd {
  @ApiProperty({title: '标题', example: '我叫禾寸'})
  @prop()
  public title: string;

  @ApiProperty({title: '内容', example: '默认内容'})
  @prop()
  public content: string;
}
