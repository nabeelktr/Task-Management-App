import { Module } from '@nestjs/common';
import { TaskServiceController } from './task-service.controller';
import { TaskServiceService } from './task-service.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { DatabaseModule } from '@app/common/database/database.module';
import { TaskRepository } from './task.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schems';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required()
    }),
    envFilePath: "./apps/task-service/.env"
  }),
  DatabaseModule,
  MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}]),
],
  controllers: [TaskServiceController],
  providers: [TaskServiceService, TaskRepository],
})
export class TaskServiceModule {}
