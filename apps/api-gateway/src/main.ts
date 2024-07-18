import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {bodyParser: false});
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  await app.listen(3001, () => {
    console.log("Api gateway server is listening..");
  });
}
bootstrap();
