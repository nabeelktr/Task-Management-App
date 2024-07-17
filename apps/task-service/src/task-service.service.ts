import { Injectable } from '@nestjs/common';
import { CreateTaskRequest } from './dto/create-task.request';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskServiceService {
  constructor(private readonly taskRepository: TaskRepository){}
  async createTask(request: CreateTaskRequest){
    return this.taskRepository.create(request);
  }
}
