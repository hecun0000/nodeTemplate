import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { Curd as CrudSchema } from './crud.model';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Crud({
  model: CrudSchema,
  routes: {
    find: {
      decorators: [
        ApiOperation({
          summary: '测试列表'
        })
      ]
    }
  }
})
@Controller('crud')
@ApiTags('Crud')
export class CrudController { 
  constructor(
    @InjectModel(CrudSchema) private readonly model: ModelType<CrudSchema>
  ){}
}
