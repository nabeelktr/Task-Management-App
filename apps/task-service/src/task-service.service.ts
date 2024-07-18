import { Injectable } from '@nestjs/common';
import { CreateTaskRequest } from './dto/create-task.request';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskServiceService {
  constructor(private readonly taskRepository: TaskRepository){}

  async createTask(request: CreateTaskRequest){
    return this.taskRepository.create(request);
  }

  async getTasks(){
    return this.taskRepository.find({})
  }

  async updateTasks(taskId: string, updateData: Partial<CreateTaskRequest>){
    return this.taskRepository.findByIdAndUpdate(taskId, updateData);
  }

  async deleteTask(taskId: string){
    await this.taskRepository.deleteById(taskId);
    return {success: "Task deleted successfully"}
  }

  async getTask(taskId:string){
    return this.taskRepository.findById(taskId);
  }
}
