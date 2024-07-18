<<<<<<< HEAD
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskServiceService } from "./task-service.service";
import { CreateTaskRequest } from "./dto/create-task.request";

@Controller("tasks")
=======
import { Body, Controller, Post } from '@nestjs/common';
import { TaskServiceService } from './task-service.service';
import { CreateTaskRequest } from './dto/create-task.request';

@Controller('tasks')
>>>>>>> 3ddc0a7 (bug fix)
export class TaskServiceController {
  constructor(private readonly taskServiceService: TaskServiceService) {}

  @Post()
<<<<<<< HEAD
  async createTask(@Body() request: CreateTaskRequest) {
=======
  async createTask(@Body() request: CreateTaskRequest){
>>>>>>> 3ddc0a7 (bug fix)
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
