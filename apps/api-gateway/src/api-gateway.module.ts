import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ApiGatewayService } from "./api-gateway.service";
import { ReverseProxyTaskMiddleware } from "./middleware/proxy.task.middleware";


@Module({
  imports: [],
  controllers: [],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReverseProxyTaskMiddleware)
      .forRoutes({ path: "v1/task-service/*", method: RequestMethod.ALL });

    consumer
    .apply(ReverseProxyAuthMiddleware)
    .forRoutes({ path: 'v1/auth-service/*', method: RequestMethod.ALL });

  }git 
}
