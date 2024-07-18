import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ApiGatewayController } from "./api-gateway.controller";
import { ApiGatewayService } from "./api-gateway.service";
import { ProxyMiddleware } from "./proxy.middleware";

@Module({
  imports: [],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProxyMiddleware)
      .forRoutes(
        { path: "/api/auth", method: RequestMethod.ALL },
        { path: "/api/task", method: RequestMethod.ALL }
      );
  }
}
