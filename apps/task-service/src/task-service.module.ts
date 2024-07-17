import { Module } from '@nestjs/common';
import { TaskServiceController } from './task-service.controller';
import { TaskServiceService } from './task-service.service';
<<<<<<< HEAD
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
=======
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
>>>>>>> bf6a401 (Complete database setup)
import { DatabaseModule } from '@app/common/database/database.module';
import { TaskRepository } from './task.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schems';

<<<<<<< HEAD

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
],
  controllers: [TaskServiceController],
  providers: [TaskServiceService, TaskRepository],
=======
=======
>>>>>>> bf6a401 (Complete database setup)

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
],
  controllers: [TaskServiceController],
<<<<<<< HEAD
  providers: [TaskServiceService],
>>>>>>> f359e91 (Complete setup of Task Service)
=======
  providers: [TaskServiceService, TaskRepository],
>>>>>>> bf6a401 (Complete database setup)
})
export class TaskServiceModule {}
