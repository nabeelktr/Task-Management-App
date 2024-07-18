import { NestFactory } from '@nestjs/core';
import { TaskServiceModule } from './task-service.module';
<<<<<<< HEAD
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(TaskServiceModule);
  app.useGlobalPipes(new ValidationPipe)
  const configService = app.get(ConfigService);
  await app.listen(configService.get("PORT"));

=======

async function bootstrap() {
  const app = await NestFactory.create(TaskServiceModule);
  await app.listen(3001);
>>>>>>> f359e91 (Complete setup of Task Service)
}
bootstrap();
