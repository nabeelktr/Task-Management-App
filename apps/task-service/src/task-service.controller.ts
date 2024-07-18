import { Body, Controller, Get, Post } from "@nestjs/common";
import { TaskServiceService } from "./task-service.service";
import { CreateTaskRequest } from "./dto/create-task.request";

@Controller("tasks")
export class TaskServiceController {
  constructor(private readonly taskServiceService: TaskServiceService) {}

  @Post()
  async createTask(@Body() request: CreateTaskRequest) {
    return this.taskServiceService.createTask(request);
  }

  @Get()
  async getTasks() {
    return this.taskServiceService.getTasks();
  }
}
