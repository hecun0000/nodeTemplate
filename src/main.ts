import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置 swagger
  const options = new DocumentBuilder()
    .setTitle('node-template')
    .setDescription('node 后台模板')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  

  // 连接手机库
  await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "test" });

  // 添加验证
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000);
}
bootstrap();

// eyJhbGciOiJIUzI1NiJ9.NWU0MTMyM2ExNjI1Y2QyOWMwMzc3NjQ1.O0SARyjHvioISSON7VYbyYWAqFJ9LkTyqkrBRW7qJSM
