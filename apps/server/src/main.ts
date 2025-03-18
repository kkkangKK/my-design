import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import multipart from '@fastify/multipart';
import { AppModule } from './modules/app/app.module';
import { appGlobalMiddleware } from './middlewares/global.middleware.ts';
import { GlobalConfig } from './config';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    origin: [
      /^http:\/\/localhost(:\d+)?$/,
      /^https:\/\/poster-craft\.leostar\.top(:81)?$/,
    ],
  });

  app.setViewEngine({
    engine: {
      'art-template': require('art-template'),
    },
    templates: join(__dirname, 'views'),
  });
  await app.register(multipart);

  appGlobalMiddleware(app);
  const config = new DocumentBuilder()
    .setTitle('PosterCraft API接口文档📄')
    .setDescription('PosterCraft-海报编辑器 API接口文档📄')
    .setVersion('v1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document, GlobalConfig.swaggerConfig);
  // await app.listen(GlobalConfig.port); // 监听端口默认是127.0.0.1，不能对外暴露
  await app.listen(GlobalConfig.port, '0.0.0.0');
}

bootstrap().then(() => Logger.log(GlobalConfig.StartLog));
