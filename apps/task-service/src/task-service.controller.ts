import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskServiceService } from './task-service.service';
import { CreateTaskRequest } from './dto/create-task.request';

@Controller('tasks')
export class TaskServiceController {
  constructor(private readonly taskServiceService: TaskServiceService) {}

  @Post()
  async createTask(@Body() request: CreateTaskRequest){
    return this.taskServiceService.createTask(request);
  }

  @Get()
  async getTasks() {
    return this.taskServiceService.getTasks();
  }

  @Put(':id')
  async updateTasks(@Body() request: CreateTaskRequest, @Param("id") taskId: string,) {
    return this.taskServiceService.updateTasks(taskId, request);
  }

  @Delete(':id')
  async deleteTask(@Param("id") taskId: string){
    return this.taskServiceService.deleteTask(taskId);
  }

  @Get('view/:id')
  async getTask(@Param("id") taskId: string) {
    return this.taskServiceService.getTask(taskId);
  }
}
