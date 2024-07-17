import { NestFactory } from '@nestjs/core';
import { TaskServiceModule } from './task-service.module';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 46742ce (Complete Create Task API implementation)
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(TaskServiceModule);
  app.useGlobalPipes(new ValidationPipe)
  const configService = app.get(ConfigService);
  await app.listen(configService.get("PORT"));
<<<<<<< HEAD

=======

async function bootstrap() {
  const app = await NestFactory.create(TaskServiceModule);
<<<<<<< HEAD
  await app.listen(3001);
>>>>>>> f359e91 (Complete setup of Task Service)
=======
  await app.listen(3002);
>>>>>>> f23eb73 (Initialize Dockerfile setup)
=======
>>>>>>> 46742ce (Complete Create Task API implementation)
}
bootstrap();
