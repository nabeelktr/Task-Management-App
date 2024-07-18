import { Module } from '@nestjs/common';
import { TaskServiceController } from './task-service.controller';
import { TaskServiceService } from './task-service.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TaskRepository } from './task.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schems';
import { AuthModule, DatabaseModule } from '@app/common';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
      PORT: Joi.number().required(),
    }),
    envFilePath: "./apps/task-service/.env"
  }),
  DatabaseModule,
  MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}]),
  AuthModule,
],
  controllers: [TaskServiceController],
  providers: [TaskServiceService, TaskRepository],
})
export class TaskServiceModule {}
