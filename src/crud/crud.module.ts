import { Module } from '@nestjs/common';
import { CrudController } from './crud.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Curd } from './crud.model';

@Module({
  imports: [
    TypegooseModule.forFeature([Curd])
  ],
  controllers: [CrudController]
})
export class CrudModule {}
