import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {bodyParser: false});
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // app.use(
  //   `/api/v1/task-service/*`,
  //   createProxyMiddleware({
  //     target: 'http://task-service:3002/',
  //     pathRewrite: {
  //       '/api/v1/task-service': '/',
  //     },
  //     changeOrigin: true,
  //     secure: false,
  //     on:{
  //       proxyReq:(proxyReq, req, res) => {
  //           console.log('[NestMiddleware]: Proxying', req.method, 'request originally made to');
  //         },
  //     }
  //   }),
  // );

  await app.listen(3001, () => {
    console.log("Api gateway server is listening..");
  });
}
bootstrap();
