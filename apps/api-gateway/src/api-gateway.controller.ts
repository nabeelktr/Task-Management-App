import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiGatewayService } from "./api-gateway.service";

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post()
  async createTask(@Body request: CreateTaskRequest): string {
    return this.apiGatewayService.createTask(request);
  }
}
