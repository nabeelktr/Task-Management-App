import { Body, Controller, Post } from '@nestjs/common';
import { TaskServiceService } from './task-service.service';
import { CreateTaskRequest } from './dto/create-task.request';
import { Task } from './schemas/task.schems';

@Controller()
export class TaskServiceController {
  constructor(private readonly taskServiceService: TaskServiceService) {}

  @Post()
  async createTask(@Body() request: CreateTaskRequest): Promise<Task> {
    return this.taskServiceService.createTask(request);
  }
}
